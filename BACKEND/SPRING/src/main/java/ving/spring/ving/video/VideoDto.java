package ving.spring.ving.video;

import lombok.*;

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
        private String title;
        private Integer videoPlay;
        private Boolean isFixed;
    }
}

