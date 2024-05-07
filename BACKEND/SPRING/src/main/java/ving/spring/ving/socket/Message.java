package ving.spring.ving.socket;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
public class Message {

    @Builder
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ChatMessage {
        private String userName;
        private String nickname;
        private String timeStamp;
        private Integer donation;
        private String text;
        private Boolean isTts;
        // private String type;
        // private String sender;
        // private Object data;
    }

    @Builder
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RecordedChat
    {
        private String userName;
        private String nickname;
        private Long timeStamp;
        private Integer donation;
        private String text;
        private boolean isTts;
    }


}
