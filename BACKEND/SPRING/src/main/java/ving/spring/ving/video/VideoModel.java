package ving.spring.ving.video;

import jakarta.persistence.*;
import lombok.*;
import ving.spring.ving.user.UserModel;

import java.time.LocalDateTime;

@Builder
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "recorded_video")
public class VideoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer videoId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserModel user;

    private Integer videoIsPublic;

    private Integer videoplay;

    private String thumbnail;

    private String videoName;



    @Column(nullable = true, updatable = false) // 변경 불가능하도록 설정
    private LocalDateTime createdAt;
    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}
