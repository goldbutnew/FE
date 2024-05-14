package ving.spring.ving.socket.chat;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.awt.*;

@Data
@Getter
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "chatRoom")
public class ChatModel {
    private String chatRoom;
    private String userName;
    private String nickname;
    private Long timeStamp;
    private Integer donation;
    private String text;
}
