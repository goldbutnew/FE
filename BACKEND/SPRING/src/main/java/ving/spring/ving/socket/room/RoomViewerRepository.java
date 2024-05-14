package ving.spring.ving.socket.room;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


@Configuration
@EnableMongoRepositories(basePackages = "com.example.myapp.mongodb.repository")
public interface RoomViewerRepository extends MongoRepository<RoomViewerModel, String> {
    RoomViewerModel findBySubscriptionId(String subscriptionId);
    Boolean existsByStreamerAndSubscriptionId(String streamer, String subscriptionId);
}
