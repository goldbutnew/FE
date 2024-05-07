package ving.spring.ving.socket;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import ving.spring.ving.socket.chat.ChatModelService;

@Slf4j
@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MessageController {

    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final ChatModelService chatModelService;
    // 메세지는 말그대로 메세지, channelId 방일 것,
    @MessageMapping("/channel/{channelId}")
    public void message(Message.ChatMessage message, @DestinationVariable("channelId") String channelId) {
        // 메세지를 받으면 convert해서 보내기
        chatModelService.toChatModel(message, channelId);
        simpMessageSendingOperations.convertAndSend("/sub/channel/" + channelId, message);
    }
    @MessageMapping("/streamer/{channelId}")
    public void newsFeed(Message.NewsFeed message, @DestinationVariable("channelId") String channelId) {
        // 메세지를 받으면 convert해서 보내기
        simpMessageSendingOperations.convertAndSend("/sub/streamer/" + channelId, message);
    }


    public void donation(Message.ChatMessage message, String channelId)
    {
        simpMessageSendingOperations.convertAndSend("/sub/channel/" + channelId, message);
    }
    
}
