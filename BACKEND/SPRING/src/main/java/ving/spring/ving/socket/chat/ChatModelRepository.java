package ving.spring.ving.socket.chat;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChatModelRepository extends MongoRepository<ChatModel, String> {
    List<ChatModel> findChatModelsByTimeStampAndChatRoom(Long timestamp, String chatRoom);
}
