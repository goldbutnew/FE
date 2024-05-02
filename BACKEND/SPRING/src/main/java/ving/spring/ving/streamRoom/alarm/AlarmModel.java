package ving.spring.ving.streamRoom.alarm;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.User;
import ving.spring.ving.subscription.SubscriptionModel;
import ving.spring.ving.user.UserModel;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "notice")
public class AlarmModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer noticeId;

    @ManyToOne
    @JoinColumn(name = "follow_id")
    private SubscriptionModel subscriptionModel;
    @Convert(converter = AlarmEnumConverter.class)
    @Column(name = "notice_content")
    private AlarmEnum noticeContent;
}
