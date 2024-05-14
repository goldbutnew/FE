package ving.spring.ving.socket.room;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "com.example.myapp.mongodb.repository")
public interface RoomModelRepository extends MongoRepository<RoomModel, String> {
    RoomModel findByStreamer(String streamer);
    Boolean existsByStreamer(String streamer);
}
