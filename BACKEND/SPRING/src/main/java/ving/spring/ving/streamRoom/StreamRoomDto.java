package ving.spring.ving.streamRoom;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class StreamRoomDto {

    @Getter
    @Builder
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateRoomRequest
    {
        private Boolean isAdult;
        private String roomName;
        private MultipartFile thumbNail;
    }


    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AlarmsDto
    {
        private List<Alarm> alarms;
    }
    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Alarm
    {
        private String streamer;
        private String type;
        private String roomName;
        private String thumbnail;
    }

    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FindAllResponse
    {
        List<StreamRoom> streamRooms;
    }

    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class StreamRoom
    {
        private String thumbnail;
        private String username;
        private String title;
        private Integer viewers;
    }
}
