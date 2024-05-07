package ving.spring.ving.streamRoom;

import jakarta.persistence.*;
import lombok.*;
import ving.spring.ving.user.UserModel;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "streaming_room")
public class StreamRoomModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roomId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserModel streamer;

    private String roomName;
    private String roomThumbnail;
    private Boolean roomAgeLimit;
    private Boolean isEnd;
    @Column(nullable = true, updatable = false) // 변경 불가능하도록 설정
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}
