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

import java.util.Base64;

@Slf4j
@Component
@RequiredArgsConstructor
public class StompHandler implements ChannelInterceptor {
    private final ChatModelService chatModelService;
    private final AntPathMatcher antPathMatcher = new AntPathMatcher();
    public String DEFAULT_PATH = "/channel/{channelId}";

    @Override
    public org.springframework.messaging.Message<?> preSend(org.springframework.messaging.Message<?> message, MessageChannel channel)
    {
        ObjectMapper objectMapper = new ObjectMapper();
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        StompCommand command = accessor.getCommand();

        if (StompCommand.CONNECT.equals(command))
        {
            // log.info(accessor.getFirstNativeHeader("Authorization"));
        }
        else if (StompCommand.SUBSCRIBE.equals(command) || StompCommand.SEND.equals(command))
        {

            String destination = accessor.getDestination();
            if (destination != null)
            {
                log.info(destination);
                String definedPath = "";
                if (StompCommand.SUBSCRIBE.equals(command))
                {
                    definedPath = "/sub" + DEFAULT_PATH;
                }
                else
                {
                    definedPath = "/pub" + DEFAULT_PATH;
                }
                log.info(definedPath);
                String channelId = antPathMatcher.extractUriTemplateVariables(definedPath, destination).get("channelId");
                String username = new String(Base64.getDecoder().decode(channelId));
                log.info("UserName은 " + username);

                if (StompCommand.SEND.equals(command)) {
                    try {
                        Message.ChatMessage chatMessage = objectMapper.readValue((byte[]) message.getPayload(), Message.ChatMessage.class);
                        log.info("Received message with type: " + chatMessage.getNickname());
                        log.info("메시지 내용은 " + chatMessage.getText());
                        chatModelService.toChatModel(chatMessage, channelId);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        }
        return message;
    }
}
