package ving.spring.ving.subscription;

import jakarta.transaction.Transactional;
import org.apache.catalina.User;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import ving.spring.ving.user.UserModel;

import java.util.List;
import java.util.Optional;

@Repository
@Configuration
@EnableJpaRepositories(basePackages = "com.example.myapp.jpa.repository")
public interface SubscriptionRepository extends JpaRepository<SubscriptionModel, Integer> {


    List<SubscriptionModel> findSubscriptionModelsByFollowerAndNotification(UserModel follower, Integer notification);
    List<SubscriptionModel> findSubscriptionModelsByStreamerAndNotification(UserModel streamer, Integer notifications);
    @Transactional
    public void deleteByFollowerAndStreamer(UserModel follower, UserModel streamer);

    public boolean existsByStreamerAndFollower(UserModel streamer, UserModel follower);

    public Integer countAllByStreamer(UserModel streamer);
    public Optional<SubscriptionModel> findByStreamerAndFollower(UserModel streamer, UserModel follower);
}
