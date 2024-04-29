package ving.spring.ving.video;

import jakarta.persistence.*;
import lombok.*;
import ving.spring.ving.user.UserModel;

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




}
