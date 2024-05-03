package ving.spring.ving.user.link;

import jakarta.persistence.*;
import lombok.*;
import ving.spring.ving.user.UserModel;

@Entity
@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_link")
public class LinkModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userLinkId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserModel userModel;
    private String url;
}
