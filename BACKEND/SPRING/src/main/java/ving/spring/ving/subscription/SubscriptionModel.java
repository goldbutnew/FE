package ving.spring.ving.subscription;

import jakarta.persistence.*;
import lombok.*;
import ving.spring.ving.user.UserModel;

@Data
@Builder
@Setter
@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "follow")
public class SubscriptionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer followId;

    @ManyToOne
    @JoinColumn(name = "following_id")
    private UserModel streamer;

    @ManyToOne
    @JoinColumn(name = "follower_id")
    private UserModel follower;

    private Integer notification;

    private Integer donation;
}
