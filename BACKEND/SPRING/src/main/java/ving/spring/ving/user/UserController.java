package ving.spring.ving.user;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.fasterxml.jackson.databind.RuntimeJsonMappingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ving.spring.ving.global.dto.DateTimeFormmer;
import ving.spring.ving.global.dto.ResponseDTO;
import ving.spring.ving.security.dto.LoginRequest;
import ving.spring.ving.security.dto.LoginResponse;
import ving.spring.ving.security.dto.UserPrincipal;
import ving.spring.ving.security.jwt.JwtIssuer;
import ving.spring.ving.subscription.SubscriptionService;
import ving.spring.ving.user.dto.FillupDto;
import ving.spring.ving.user.dto.ProfileDto;
import ving.spring.ving.user.dto.UserDto;
import ving.spring.ving.user.link.LinkDto;
import ving.spring.ving.user.link.LinkModel;
import ving.spring.ving.user.link.LinkService;
import ving.spring.ving.video.VideoDto;
import ving.spring.ving.video.VideoModel;
import ving.spring.ving.video.VideoService;
import ving.spring.ving.video.fixedVideo.FixedVideoService;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final PasswordEncoder passwordEncoder;
    private final JwtIssuer jwtIssuer;
    private final LinkService linkService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final VideoService videoService;
    private final AmazonS3Client amazonS3Client;
    private final SubscriptionService subscriptionService;
    private final FixedVideoService fixedVideoService;
    private final DateTimeFormmer dateTimeFormmer;
    @Value("${spring.cloud.aws.s3.bucket}")
    private String bucket;
    @PostMapping("/api/auth/login")

    public LoginResponse login(@RequestBody @Validated LoginRequest request) {

        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        var principal = (UserPrincipal) authentication.getPrincipal();
        UserModel userModel = userService.findByUserUsername(request.getUsername()).orElseThrow();
        var roles = principal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        var token = jwtIssuer.issue(principal.getUserId(), principal.getEmail());
        return LoginResponse.builder()
                .token(
                        LoginResponse.token.builder()
                                .accessToken(token)
                                .refreshToken(token)
                                .build()
                )
                .info(
                        LoginResponse.info.builder()
                                .username(userModel.getUserUsername())
                                .nickname(userModel.getUserNickname())
                                .build()
                ).build();
    }

    @PostMapping("/api/auth/signup")
    public ResponseEntity<?> signup(@RequestBody LoginRequest.SignUpRequest request) {
        // TODO: process POST request
        try {
            if (request == null || request.getPassword() == null) {
                throw new RuntimeJsonMappingException("INVALID PASSWORD");
            }
            UserModel user = UserModel.builder()
                    .userUsername(request.getUsername())
                    .userPassword(passwordEncoder.encode(request.getPassword()))
                    .userSubscriberCount(0)
                    .userNickname(request.getNickname())
                    .userPhoto("NULL")
                    .userChoco(0)
                    .userIsregistered(1)
                    .build();


            UserModel registerUserModel = userService.create(user);
            var token = jwtIssuer.issue(registerUserModel.getUserId(),
                    registerUserModel.getUserUsername());
            LoginResponse loginResponse = LoginResponse.builder()
                    .token(
                            LoginResponse.token.builder()
                                    .accessToken(token)
                                    .refreshToken(token)
                                    .build()
                    )
                    .info(
                            LoginResponse.info.builder()
                                    .nickname(registerUserModel.getUserNickname())
                                    .build()
                    ).build();

            return ResponseEntity.ok().body(loginResponse);
        } catch (Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity
                    .badRequest()
                    .body(responseDTO);
        }
    }

    @PatchMapping("/api/auth/choco")
    public ResponseEntity<?> choco(@RequestBody UserDto.choco choco)
    {
        UserModel userModel = userService.findCurrentUser();
        userModel.setUserChoco(choco.getChoco() + userModel.getUserChoco());
        userService.save(userModel);
        return ResponseEntity.ok().body("충전 완료");
    }

    @GetMapping("/api/auth/isRegistered")
    public ResponseEntity<?> isRegistered(@RequestParam String username)
    {
        return ResponseEntity.ok().body(
                LoginResponse.isRegistered.builder()
                        .isRegistered(userService.existsByUserUsername(username))
                        .build()
        );
    }

    @PostMapping("/api/auth/postLink")
    ResponseEntity<?> postLinks(@RequestBody LinkDto linkDto)
    {
        try
        {
            UserModel userModel = userService.findCurrentUser();
            LinkModel linkModel = LinkModel.builder()
                    .userModel(userModel)
                    .url(linkDto.getUrl())
                    .build();
            linkService.save(linkModel);
            return ResponseEntity.ok(HttpStatus.CREATED);
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("api/auth/deleteLink")
    ResponseEntity<?> deleteLink(@RequestBody LinkDto linkDto)
    {
        try
        {
            UserModel userModel = userService.findCurrentUser();
            LinkModel linkModel = linkService.findLinkModelByUrlAndUserModel(linkDto.getUrl(), userModel);
            linkService.delete(linkModel);
            return ResponseEntity.ok(HttpStatus.NO_CONTENT);
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/api/auth/getProfile")
    public ResponseEntity<?> getProfile(@RequestParam String username)
    {
        UserModel userModel = userService.findByUserUsername(username).orElseThrow();
        UserModel me = userService.findCurrentUser();
        List<VideoModel> videoModels = videoService.findVideoModelsByUser(userModel);
        List<VideoDto.VideoEntity> returnList = new ArrayList<>();
        List<String> links = new ArrayList<>();
        linkService.findLinkModelsByUserModel(userModel).forEach(
                x -> links.add(x.getUrl())
        );
        for (VideoModel videoModel : videoModels)
        {
            returnList.add(
                    VideoDto.VideoEntity.builder()
                            .title(videoModel.getVideoName())
                            .videoId(videoModel.getVideoId())
                            .thumbnail(videoModel.getThumbnail())
                            .videoPlay(videoModel.getVideoplay())
                            .createdAt(dateTimeFormmer.transform(videoModel.getCreatedAt()))
                            .isFixed(fixedVideoService.existsByVideoModel(videoModel))
                            .build()
            );
        }

        return ResponseEntity.ok().body(
                ProfileDto.builder()
                        .nickname(userModel.getUserNickname())
                        .introduction(userModel.getUserIntroduction())
                        .followers(subscriptionService.countAllByStreamer(userModel))
                        .photoUrl(userModel.getUserPhoto())
                        .videos(returnList)
                        .links(links)
                        .isFollowed(subscriptionService.existsByStreamerAndFollower(userModel, me))
                        .build()
        );
    }

    @PatchMapping("/api/auth/fillup")
    public ResponseEntity<?> fillUp(@ModelAttribute FillupDto fillupDto)
    {
        try
        {
            MultipartFile photo = fillupDto.getPhoto();
            String nickname = fillupDto.getNickname();
            String introduction = fillupDto.getIntroduction();
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String username = userDetails.getUsername();
            UserModel userModel = userService.findByUserUsername(username).orElseThrow();
            String sourceFileName = photo.getOriginalFilename();
            String sourceFileNameExtension = FilenameUtils.getExtension(sourceFileName).toLowerCase();
            String fileUrl = "https://" + bucket +".s3.ap-northeast-2.amazonaws.com" + "/";
            String destinationFileName = RandomStringUtils.randomAlphabetic(5) + "_" + username  + "."
                    + sourceFileNameExtension;
            userModel.setUserNickname(fillupDto.getNickname());
            userModel.setUserIntroduction(fillupDto.getIntroduction());
            String finalUrl = (fileUrl + destinationFileName);

            userModel.setUserPhoto(finalUrl);
            userService.save(userModel);
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(photo.getContentType());
            metadata.setContentLength(photo.getSize());
            amazonS3Client.putObject(bucket, destinationFileName, photo.getInputStream() ,metadata);
            FillupDto.FillupReturnDto fillupReturnDto = FillupDto.FillupReturnDto.builder()
                    .nickname(nickname)
                    .introduction(introduction)
                    .photoUrl(finalUrl)
                    .build();

            return ResponseEntity.ok().body(fillupReturnDto);
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}