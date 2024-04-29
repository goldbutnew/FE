package ving.spring.ving.subscription;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ving.spring.ving.user.UserModel;
import ving.spring.ving.user.UserService;

@RestController
@RequestMapping("/api/sub")
@RequiredArgsConstructor
public class SubscriptionController {
    private final UserService userService;
    private final SubscriptionService subscriptionService;
    @PostMapping("/subscript")
    public  ResponseEntity<?> subscript(@RequestBody SubscriptionDto.SubscriptRequest subscriptRequest)
    {
        UserModel streamer = userService.findByUserId(subscriptRequest.getUserId()).orElseThrow();
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
                        .userId(subscriptRequest.getUserId())
                        .build()
        );

    }

    @DeleteMapping("/unSubscript")
    public ResponseEntity<?> unSubscript(@RequestBody SubscriptionDto.SubscriptRequest subscriptRequest)
    {
        UserModel streamer = userService.findByUserId(subscriptRequest.getUserId()).orElseThrow();
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
        UserModel streamer = userService.findByUserId(subscriptRequest.getUserId()).orElseThrow();
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
}
