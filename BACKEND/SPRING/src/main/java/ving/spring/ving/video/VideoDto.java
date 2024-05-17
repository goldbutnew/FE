package ving.spring.ving.video;

import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
public class VideoDto {

    @Builder
    @Getter
    @Setter
    public static class ChangePublic {
        private Integer isPublic;
        private Integer videoId;
    }

    @Builder
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VideoRequest {
        private Integer videoId;
    }

    @Builder
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VideoEntity
    {
        private String thumbnail;
        private Integer videoId;
        private String title;
        private Integer videoPlay;
        private Integer videoLength;
        private Integer videoSerial;
        private Boolean isFixed;
        private String createdAt;
    }
}

