package ving.spring.ving.streamRoom;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.joda.time.DateTime;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ving.spring.ving.global.dto.DateTimeFormmer;
import ving.spring.ving.s3.S3Service;
import ving.spring.ving.socket.Message;
import ving.spring.ving.socket.chat.ChatModel;
import ving.spring.ving.socket.chat.ChatModelService;
import ving.spring.ving.streamRoom.alarm.AlarmEnum;
import ving.spring.ving.streamRoom.alarm.AlarmModel;
import ving.spring.ving.streamRoom.alarm.AlarmService;
import ving.spring.ving.subscription.SubscriptionModel;
import ving.spring.ving.subscription.SubscriptionService;
import ving.spring.ving.user.UserModel;
import ving.spring.ving.user.UserService;
import ving.spring.ving.video.VideoDto;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/stream")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class StreamRoomController {
    private final ChatModelService chatModelService;
    private final UserService userService;
    private final StreamRoomService streamRoomService;
    private final S3Service s3Service;
    private final SubscriptionService subscriptionService;
    private final AlarmService alarmService;
    private final DateTimeFormmer dateTimeFormmer;
    @GetMapping("/chatting")
    List<Message.RecordedChat> getChatting(@RequestParam("videoName") String videoName,@RequestParam("timeStamp") String timeStamp)
    {
        log.info(timeStamp);
        LocalDateTime localDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        LocalDateTime spentTime = LocalDateTime.parse(timeStamp, formatter);
        Duration duration = Duration.between(spentTime, localDateTime);
        log.info(String.valueOf(duration.getSeconds()));
        return chatModelService.findChatModelsByTimeStamp(duration.getSeconds(), videoName);
    }

    @PostMapping(value = "/tmpCreate", consumes = "multipart/form-data")
    ResponseEntity<?> tmpCreate(@ModelAttribute StreamRoomDto.CreateRoomRequest createRoomRequest)
    {
        try {
            UserModel streamer = userService.findCurrentUser();
            StreamRoomModel streamRoomModel = StreamRoomModel.builder()
                    .streamer(streamer)
                    .roomThumbnail(s3Service.saveMedia(createRoomRequest.getThumbNail(), createRoomRequest.getRoomName()))
                    .roomName(createRoomRequest.getRoomName())
                    .roomAgeLimit(createRoomRequest.getIsAdult())
                    .isEnd(false)
                    .build();
            streamRoomService.save(streamRoomModel);

            // 메세징큐로 영상 녹화하는 내용 추가해야함

            // 모든 구독 찾아서 더해줘야함
            List<SubscriptionModel> subscriptionModels =  subscriptionService.findSubscriptionModelsByStreamerAndNotification(streamer);
            for (SubscriptionModel subscriptionModel : subscriptionModels)
            {
                AlarmModel alarmModel = AlarmModel.builder()
                        .subscriptionModel(subscriptionModel)
                        .noticeContent(AlarmEnum.streaming)
                        .build();
                alarmService.save(alarmModel);
            }
            return ResponseEntity.ok(HttpStatus.CREATED);
        }
        catch (Exception e)
        {
            return  ResponseEntity.badRequest().body("안됨");
        }
    }

    @GetMapping("/getOnAir")
    ResponseEntity<?> getOnAir(@RequestParam String username)
    {
        try
        {
            UserModel userModel = userService.findByUserUsername(username).orElseThrow();
            StreamRoomModel streamRoomModel = streamRoomService.findStreamRoomModelByStreamerAndIsEnd(userModel);
            VideoDto.VideoEntity videoEntity = VideoDto.VideoEntity.builder()
                    .isFixed(false)
                    .videoPlay(0)
                    .videoId(-1)
                    .title(streamRoomModel.getRoomName())
                    .thumbnail(streamRoomModel.getRoomThumbnail())
                    .createdAt(dateTimeFormmer.transform(streamRoomModel.getCreatedAt()))
                    .build();
            return ResponseEntity.ok(videoEntity);
        } catch (Exception e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/findAll")
    ResponseEntity<?> findAll()
    {
        List<StreamRoomDto.StreamRoom> streamRooms = new ArrayList<>();

        for (StreamRoomModel streamRoomModel : streamRoomService.findAll())
        {

            streamRooms.add(
                    StreamRoomDto.StreamRoom.builder()
                            .title(streamRoomModel.getRoomName())
                            .username(streamRoomModel.getStreamer().getUserUsername())
                            .viewers(0)
                            .thumbnail(streamRoomModel.getRoomThumbnail())
                            .build()
            );
        }
        StreamRoomDto.FindAllResponse findAllResponse = StreamRoomDto.FindAllResponse.builder()
                .streamRooms(streamRooms)
                .build();
        return ResponseEntity.ok(findAllResponse);
    }
    @GetMapping("/getAlarm")
    ResponseEntity<?> getAlarm()
    {
        try {
            List<SubscriptionModel> subscriptionModels = subscriptionService.findSubscriptionModelsByFollowerAndNotification(userService.findCurrentUser());
            List<StreamRoomDto.Alarm> alarms = new ArrayList<>();

            for (SubscriptionModel subscriptionModel : subscriptionModels)
            {
                List<AlarmModel> alarmModels = alarmService.findAlarmModelsBySubscriptionModel(subscriptionModel);
                // alarmModels.addAll(alarmModels1);
                for (AlarmModel alarmModel : alarmModels)
                {
                    alarms.add(
                            StreamRoomDto.Alarm.builder()
                                    .streamer(subscriptionModel.getStreamer().getUserNickname())
                                    .type(alarmModel.getNoticeContent().toString())
                                    .build()
                    );
                }
            }
            return ResponseEntity.ok(StreamRoomDto.AlarmsDto.builder()
                    .alarms(alarms)
                    .build()
            );
        } catch (Exception e)
        {
            return ResponseEntity.badRequest().body(HttpStatus.BAD_REQUEST);
        }

    }
}
