package ving.spring.ving.video;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ving.spring.ving.user.UserModel;
import ving.spring.ving.user.UserService;
import ving.spring.ving.video.fixedVideo.FixedVideoModel;
import ving.spring.ving.video.fixedVideo.FixedVideoService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/video")
@CrossOrigin(origins = "http://localhost:3000")
public class VideoController {
    private final UserService userService;
    private final VideoService videoService;
    private final FixedVideoService fixedVideoService;
    // 임시
    @PostMapping("/create")
    public ResponseEntity<?> Create()
    {
        VideoModel videoModel = VideoModel.builder()
                .videoIsPublic(1)
                .videoplay(0)
                .user(userService.findCurrentUser())
                .videoName("Testing")
                .build();
        videoService.create(videoModel);
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @PatchMapping("/changePublic")
    public ResponseEntity<?> changePublic(@RequestBody VideoDto.VideoRequest videoRequest)
    {
        try
        {
            VideoModel videoModel =  videoService.findByVideoId(videoRequest.getVideoId());
            UserModel userModel = userService.findCurrentUser();
            if (!videoModel.getUser().equals(userModel))
            {
                //에러발생
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You do not have permission to modify this video.");
            }
            videoModel.setVideoIsPublic(Math.abs(videoModel.getVideoIsPublic() - 1));
            videoService.create(videoModel);
            return ResponseEntity.ok().body(
                    VideoDto.ChangePublic.builder()
                            .isPublic(videoModel.getVideoIsPublic())
                            .videoId(videoRequest.getVideoId())
                            .build()
            );
        } catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("다른 유저의 동영상을 삭제할 수 없다 새끼야");
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@RequestBody VideoDto.VideoRequest videoRequest)
    {
        VideoModel videoModel =  videoService.findByVideoId(videoRequest.getVideoId());
        UserModel userModel = userService.findCurrentUser();
        if (!videoModel.getUser().equals(userModel))
        {
            //에러발생
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You do not have permission to modify this video.");
        }
        videoService.delete(videoModel);
        return ResponseEntity.ok(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/doFix")
    public ResponseEntity<?> doFix(@RequestBody VideoDto.VideoRequest videoRequest)
    {
        VideoModel videoModel =  videoService.findByVideoId(videoRequest.getVideoId());
        UserModel userModel = userService.findCurrentUser();
        log.info("씨발");
        if (!videoModel.getUser().equals(userModel))
        {
            //에러발생
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You do not have permission to modify this video.");
        }
        if (fixedVideoService.existsByUserModel(userModel))
        {
            fixedVideoService.deleteByUserModel(userModel);
        }
        FixedVideoModel fixedVideoModel = FixedVideoModel.builder()
                .userModel(userModel)
                .videoModel(videoModel)
                .build();

        fixedVideoService.create(fixedVideoModel);
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @DeleteMapping("/undoFix")
    public ResponseEntity<?> undoFix(@RequestBody VideoDto.VideoRequest videoRequest)
    {
        VideoModel videoModel =  videoService.findByVideoId(videoRequest.getVideoId());
        UserModel userModel = userService.findCurrentUser();
        if (!videoModel.getUser().equals(userModel))
        {
            //에러발생
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You do not have permission to modify this video.");
        }
        if (fixedVideoService.existsByUserModel(userModel))
        {
            fixedVideoService.deleteByUserModel(userModel);
        }
        return ResponseEntity.ok(HttpStatus.NO_CONTENT);
    }
}
