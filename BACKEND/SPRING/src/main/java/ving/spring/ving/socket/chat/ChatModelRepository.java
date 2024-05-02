package ving.spring.ving.socket.chat;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.List;
@Configuration
@EnableMongoRepositories(basePackages = "com.example.myapp.mongodb.repository")
public interface ChatModelRepository extends MongoRepository<ChatModel, String> {
    List<ChatModel> findChatModelsByTimeStampAndChatRoom(Long timestamp, String chatRoom);
}
