package ving.spring.ving.subscription;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ving.spring.ving.user.UserModel;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;

    public List<SubscriptionModel> findSubscriptionModelsByStreamerAndNotification(UserModel streamer)
    {
        return subscriptionRepository.findSubscriptionModelsByStreamerAndNotification(streamer, 1);
    }

    public List<SubscriptionModel> findSubscriptionModelsByFollowerAndNotification(UserModel follower)
    {
        return subscriptionRepository.findSubscriptionModelsByFollowerAndNotification(follower, 1);
    }

    public SubscriptionModel create(SubscriptionModel subscriptionModel)
    {
        return subscriptionRepository.save(subscriptionModel);
    }

    public void delete(UserModel streamer, UserModel follower)
    {
        subscriptionRepository.deleteByFollowerAndStreamer(follower, streamer);
    }

    public boolean existsByStreamerAndFollower(UserModel streamer, UserModel follower)
    {
        return subscriptionRepository.existsByStreamerAndFollower(streamer, follower);
    }

    public Integer countAllByStreamer(UserModel streamer)
    {
        return subscriptionRepository.countAllByStreamer(streamer);
    }

    public SubscriptionModel findByStreamerAndFollower(UserModel streamer, UserModel follower)
    {
        return subscriptionRepository.findByStreamerAndFollower(streamer, follower).orElseThrow();
    }
}
