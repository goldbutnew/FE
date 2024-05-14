package ving.spring.ving.socket.room;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import ving.spring.ving.user.UserModel;

@Data
@Getter
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "streamRoom")
public class RoomModel {
    @Id
    private String id;
    private String createdAt;
    private String streamer;
    private String title;
    private Integer viewers;
}
