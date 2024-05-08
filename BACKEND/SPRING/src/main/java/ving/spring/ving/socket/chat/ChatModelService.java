package ving.spring.ving.socket.chat;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ving.spring.ving.socket.Message;
import ving.spring.ving.streamRoom.StreamRoomModel;
import ving.spring.ving.streamRoom.StreamRoomService;
import ving.spring.ving.user.UserModel;
import ving.spring.ving.user.UserService;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatModelService {
    private final ChatModelRepository chatModelRepository;
    private final StreamRoomService streamRoomService;
    private final UserService userService;

    public ChatModel save(ChatModel chatModel)
    {
        return chatModelRepository.save(chatModel);
    }

    public ChatModel toChatModel(Message.ChatMessage chatMessage, String chatRoom)
    {
        String username = new String(Base64.getDecoder().decode(chatRoom));
        UserModel streamer = userService.findByUserUsername(username).orElseThrow();
        log.info(streamer.getUserUsername() + " 입니다잉");
        StreamRoomModel streamRoomModel =  streamRoomService.findStreamRoomModelByStreamerAndIsEnd(streamer);
        LocalDateTime createdAt = streamRoomModel.getCreatedAt();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime spentTime = LocalDateTime.parse(chatMessage.getTimeStamp(), formatter);

        Duration duration = Duration.between(createdAt, spentTime);
        return chatModelRepository.save(ChatModel.builder()
                .userName(chatMessage.getUserName())
                .chatRoom(chatRoom)
                .text(chatMessage.getText())
                .nickname(chatMessage.getNickname())
                .donation(chatMessage.getDonation())
                .timeStamp(duration.getSeconds())
                .build());

    }

    public List<Message.RecordedChat> findChatModelsByTimeStamp(Long timestamp, String chatRoom)
    {
        return shapeShifts(chatModelRepository.findChatModelsByTimeStampAndChatRoom(timestamp, chatRoom));
    }

    public List<Message.RecordedChat> shapeShifts(List<ChatModel> chatModels)
    {
         List<Message.RecordedChat> chatMessages = new ArrayList<>();
         chatModels.forEach(x ->
                         chatMessages.add(
                 Message.RecordedChat
                .builder()
                .userName(x.getChatRoom())
                .nickname(x.getNickname())
                .timeStamp(x.getTimeStamp())
                .donation(x.getDonation())
                .text(x.getText())
                .build()
            )
        );
         return chatMessages;
    }
}
