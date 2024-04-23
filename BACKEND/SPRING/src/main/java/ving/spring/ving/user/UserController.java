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
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ving.spring.ving.global.dto.ResponseDTO;
import ving.spring.ving.security.dto.LoginRequest;
import ving.spring.ving.security.dto.LoginResponse;
import ving.spring.ving.security.dto.UserPrincipal;
import ving.spring.ving.security.jwt.JwtIssuer;
import ving.spring.ving.user.dto.FillupDto;

import java.util.Date;
import java.util.Optional;


@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhsot:3000")
public class UserController {

    private final PasswordEncoder passwordEncoder;
    private final JwtIssuer jwtIssuer;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final AmazonS3Client amazonS3Client;
    @Value("${spring.cloud.aws.s3.bucket}")
    private String bucket;
    @PostMapping("/auth/login")
    public LoginResponse login(@RequestBody @Validated LoginRequest request) {
        log.info("Authentication Token 앞");
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        log.info("Authentication Token 뒤");
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
                                .nickname(userModel.getUserNickname())
                                .build()
                ).build();

    }

    @PostMapping("/auth/signup")
    public ResponseEntity<?> signup(@RequestBody LoginRequest request) {
        // TODO: process POST request
        try {
            if (request == null || request.getPassword() == null) {
                throw new RuntimeJsonMappingException("INVALID PASSWORD");
            }
            UserModel user = UserModel.builder()
                    .userUsername(request.getUsername())
                    .userPassword(passwordEncoder.encode(request.getPassword()))
                    .userSubscriberCount(0)
                    .userNickname("NULL")
                    .userPhoto("NULL")
                    .userChoco(0)
                    .userIsregistered(1)
                    .build();
            
            log.info("좋아쒀");

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
    @PatchMapping("/auth/fillup")
    public ResponseEntity<?> fillup(@ModelAttribute FillupDto fillupDto)
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

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(photo.getContentType());
            metadata.setContentLength(photo.getSize());
            amazonS3Client.putObject(bucket, destinationFileName, photo.getInputStream() ,metadata);
            FillupDto.FillupReturnDto fillupReturnDto = FillupDto.FillupReturnDto.builder()
                    .nickname(nickname)
                    .introduction(introduction)
                    .photoUrl(fileUrl)
                    .build();

            return ResponseEntity.ok().body(fillupReturnDto);
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }


    }
}