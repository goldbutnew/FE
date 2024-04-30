package ving.spring.ving.video.fixedVideo;

import jakarta.persistence.*;
import lombok.*;
import ving.spring.ving.user.UserModel;
import ving.spring.ving.video.VideoModel;

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "represent_video")
public class FixedVideoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userVideoId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserModel userModel;

    @ManyToOne
    @JoinColumn(name = "video_id")
    private VideoModel videoModel;

}
