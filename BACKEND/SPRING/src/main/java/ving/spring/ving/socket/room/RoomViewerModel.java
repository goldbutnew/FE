package ving.spring.ving.socket.room;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Getter
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "chattingSession")
public class RoomViewerModel {
    @Id
    private String id;
    private String streamer;
    private String subscriptionId;
}
