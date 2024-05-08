package ving.spring.ving.subscription;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ving.spring.ving.socket.Message;
import ving.spring.ving.socket.MessageController;
import ving.spring.ving.streamRoom.StreamRoomModel;
import ving.spring.ving.streamRoom.StreamRoomService;
import ving.spring.ving.user.UserModel;
import ving.spring.ving.user.UserService;

import javax.swing.text.View;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;

@Slf4j
@RestController
@RequestMapping("/api/sub")
@RequiredArgsConstructor
public class SubscriptionController {
    private final UserService userService;
    private final SubscriptionService subscriptionService;
    private final StreamRoomService streamRoomService;

    private final MessageController messageController;
    @PostMapping("/subscript")
    public  ResponseEntity<?> subscript(@RequestBody SubscriptionDto.SubscriptRequest subscriptRequest)
    {
        UserModel streamer = userService.findByUserUsername(subscriptRequest.getUsername()).orElseThrow();
        UserModel follower = userService.findCurrentUser();

        if (streamer.equals(follower))
        {
            return ResponseEntity.badRequest().body("나를 팔로우 할 수 없음");
        }
        if (subscriptionService.existsByStreamerAndFollower(streamer, follower))
        {
            return ResponseEntity.badRequest().body("이미 팔로우 된 사람임");
        }

        SubscriptionModel subscriptionModel = SubscriptionModel.builder()
                .streamer(streamer)
                .follower(follower)
                .notification(1)
                .donation(0)
                .build();


        subscriptionService.create(subscriptionModel);


        return ResponseEntity.ok(
                SubscriptionDto.SubscriptResponse.builder()
                        .username(subscriptRequest.getUsername())
                        .build()
        );

    }


    @GetMapping("/tmpAlarm")
    public ResponseEntity<?> tmpAlarm(@RequestParam String streamer, @RequestParam String viewer)
    {
        UserModel Streamer = userService.findByUserUsername(streamer).orElseThrow();
        UserModel Viewer = userService.findByUserUsername(viewer).orElseThrow();


        if (subscriptionService.existsByStreamerAndFollower(Streamer, Viewer) )
        {
            subscriptionService.findByStreamerAndFollower(Streamer, Viewer).setNotification(1);
        }
        else
        {
            SubscriptionModel subscriptionModel = SubscriptionModel.builder()
                    .donation(0)
                    .follower(Viewer)
                    .streamer(Streamer)
                    .notification(1)
                    .build();
            subscriptionService.create(subscriptionModel);
        }
        StreamRoomModel streamRoomModel = StreamRoomModel.builder()
                .streamer(Streamer)
                .roomThumbnail("https://vingving.s3.ap-northeast-2.amazonaws.com/WwGSt_모두 모여라.png")
                .roomName("tmptmp")
                .isEnd(false)
                .build();


        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @DeleteMapping("/unSubscript")
    public ResponseEntity<?> unSubscript(@RequestBody SubscriptionDto.SubscriptRequest subscriptRequest)
    {
        UserModel streamer = userService.findByUserUsername(subscriptRequest.getUsername()).orElseThrow();
        UserModel follower = userService.findCurrentUser();


        if (streamer.equals(follower))
        {
            return ResponseEntity.badRequest().body("나를 팔로우 할 수 없음");
        }
        subscriptionService.delete(streamer, follower);
        return ResponseEntity.ok(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/changeAlarm")
    public ResponseEntity<?> changeAlarm(@RequestBody SubscriptionDto.SubscriptRequest subscriptRequest)
    {
        UserModel streamer = userService.findByUserUsername(subscriptRequest.getUsername()).orElseThrow();
        UserModel follower = userService.findCurrentUser();
        if (streamer.equals(follower))
        {
            return ResponseEntity.badRequest().body("나를 팔로우 할 수 없음");
        }

        SubscriptionModel subscriptionModel = subscriptionService.findByStreamerAndFollower(streamer, follower);

        subscriptionModel.setNotification(Math.abs(subscriptionModel.getNotification() - 1));
        subscriptionService.create(subscriptionModel);
        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }

    @PatchMapping("/donation")
    public ResponseEntity<?> donation(@RequestBody SubscriptionDto.DonationRequest donationRequest)
    {
        log.info(donationRequest.getUsername());
        try
        {
            UserModel follower = userService.findCurrentUser();
            UserModel streamer = userService.findByUserUsername(donationRequest.getUsername()).orElseThrow();
            SubscriptionModel subscriptionModel = subscriptionService.findByStreamerAndFollower(streamer, follower);
            subscriptionModel.setDonation(subscriptionModel.getDonation() + donationRequest.getChoco());
            if (follower.getUserChoco() < donationRequest.getChoco())
            {
                throw new BadRequestException("초코가 부족합니다");
            }

            follower.setUserChoco(follower.getUserChoco() - donationRequest.getChoco());
            streamer.setUserChoco(streamer.getUserChoco() + donationRequest.getChoco());
            String strBase64Encode = Base64.getEncoder().encodeToString(donationRequest.getUsername().getBytes());
            log.info(strBase64Encode);
            userService.save(follower);
            userService.save(streamer);
            subscriptionService.create(subscriptionModel);

            LocalDateTime now = LocalDateTime.now();
            // 원하는 날짜/시간 포맷을 정의합니다.
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            // LocalDateTime 객체를 포맷터를 사용하여 문자열로 변환합니다.
            String formattedDate = now.format(formatter);

            Message.ChatMessage chatMessage = Message.ChatMessage.builder()
                    .userName(follower.getUserUsername())
                    .nickname(follower.getUserNickname())
                    .donation(donationRequest.getChoco())
                    .timeStamp(formattedDate)
                    .isTts(donationRequest.getIsTts())
                    .text(donationRequest.getMessage())
                    .build();
            messageController.donation(chatMessage, strBase64Encode);
            return ResponseEntity.ok(HttpStatus.OK);
        }

        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}
