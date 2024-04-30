package ving.spring.ving.user;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    private String userUsername;
    private String userPassword;
    private String userNickname;


    private Integer userIsregistered;
    private String userPhoto;
    private String userIntroduction;


    private Integer userDonated;
    private Integer userChoco;
    private Integer userSubscriberCount;


    @Column(nullable = true)
    private LocalDateTime userLeaveDate;

}
