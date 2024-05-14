package ving.spring.ving.socket;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import ving.spring.ving.socket.chat.ChatModelService;
import ving.spring.ving.socket.room.RoomModel;
import ving.spring.ving.socket.room.RoomModelService;
import ving.spring.ving.socket.room.RoomViewerModel;
import ving.spring.ving.socket.room.RoomViewerService;

import java.util.Base64;

@Slf4j
@Component
@RequiredArgsConstructor
public class StompHandler implements ChannelInterceptor {
    private final ChatModelService chatModelService;
    private final AntPathMatcher antPathMatcher = new AntPathMatcher();
    private final RoomModelService roomModelService;
    private final  RoomViewerService roomViewerService;
    public String DEFAULT_PATH = "/channel/{channelId}";
    public String STREAM_PATH = "/stream/{channelId}";

    @Override
    public org.springframework.messaging.Message<?> preSend(org.springframework.messaging.Message<?> message, MessageChannel channel)
    {
        ObjectMapper objectMapper = new ObjectMapper();
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        StompCommand command = accessor.getCommand();

        if (StompCommand.SUBSCRIBE.equals(command))
        {
            String destination = accessor.getDestination();
            log.info("구독하셨습니다 " + destination );
            if (destination != null) {
                log.info(destination);
                String definedPath = "";
                definedPath = "/sub" + DEFAULT_PATH;
                log.info(definedPath);

                log.info(definedPath);
                String channelId = antPathMatcher.extractUriTemplateVariables(definedPath, destination).get("channelId");
                String username = new String(Base64.getDecoder().decode(channelId));
                log.info("UserName은 " + username);
                log.info("구독하셨다");
                if (!roomViewerService.existsByStreamerAndSubscriptionId(username, accessor.getSubscriptionId()))
                {
                    try {
                        RoomModel roomModel = roomModelService.findByStreamer(username);
                        roomModel.setViewers(roomModel.getViewers() + 1);
                        roomModelService.save(roomModel);
                        RoomViewerModel roomViewerModel = RoomViewerModel.builder()
                                .streamer(username)
                                .subscriptionId(accessor.getSubscriptionId())
                                .build();
                        roomViewerService.save(roomViewerModel);
                        log.info("구독하셨다 " + roomViewerModel.getStreamer() + " " + roomViewerModel.getSubscriptionId());
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }

            }
        }
        else if (StompCommand.CONNECT.equals(command))
        {
            log.info("들어오셨습니다");
            // log.info(accessor.getFirstNativeHeader("Authorization"));
        }
        else if (StompCommand.DISCONNECT.equals(command)) {
            // Handle disconnection logic

            log.info("DIsConnect 되셨습니다");
            // Perform any cleanup or notification logic here
        }
        else if (StompCommand.SEND.equals(command))
        {
            String destination = accessor.getDestination();
            if (antPathMatcher.match(DEFAULT_PATH, destination))
            {
                if (destination != null)
                {
                    log.info(destination);
                    String definedPath = "";
                    definedPath = "/pub" + DEFAULT_PATH;

                    log.info(definedPath);
                    String channelId = antPathMatcher.extractUriTemplateVariables(definedPath, destination).get("channelId");
                    String username = new String(Base64.getDecoder().decode(channelId));
                    log.info("UserName은 " + username);
                    try {
                        Message.ChatMessage chatMessage = objectMapper.readValue((byte[]) message.getPayload(), Message.ChatMessage.class);
                        log.info("Received message with type: " + chatMessage.getNickname());
                        log.info("메시지 내용은 " + chatMessage.getText());
                        log.info("왜 안찾아지는거지? " + chatMessage.getUserName());
                        chatModelService.toChatModel(chatMessage, channelId);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            } else if (antPathMatcher.match(STREAM_PATH, destination))
            {

            }
        }
        else if (StompCommand.UNSUBSCRIBE.equals(command))
        {
            String destination = accessor.getDestination();
            String subscriptionId = accessor.getSubscriptionId();
            log.info("나가셨다 " + destination + " " + subscriptionId ) ;
            RoomViewerModel roomViewerModel = roomViewerService.findBySubscriptionId(subscriptionId);
            log.info("시청자가 1 줄으셨다");
            RoomModel roomModel = roomModelService.findByStreamer(roomViewerModel.getStreamer());
            roomViewerService.delete(roomViewerModel);
            roomModel.setViewers(roomModel.getViewers() - 1);
            log.info("시청자가 1 줄으셨다");
            roomModelService.save(roomModel);
        }
        return message;
    }
}
