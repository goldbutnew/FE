package ving.spring.ving.subscription;

import jakarta.transaction.Transactional;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ving.spring.ving.user.UserModel;

import java.util.Optional;

@Repository
public interface SubscriptionRepository extends JpaRepository<SubscriptionModel, Integer> {


    @Transactional
    public void deleteByFollowerAndStreamer(UserModel follower, UserModel streamer);

    public boolean existsByStreamerAndFollower(UserModel streamer, UserModel follower);

    public Integer countAllByStreamer(UserModel streamer);
    public Optional<SubscriptionModel> findByStreamerAndFollower(UserModel streamer, UserModel follower);
}
