package ving.spring.ving.socket.room;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ving.spring.ving.socket.chat.ChatModel;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoomModelService {
    private final RoomModelRepository roomModelRepository;
    public RoomModel save(RoomModel roomModel)
    {
        log.info("저장이 됐나요?");
        return roomModelRepository.save(roomModel);
    }

    public void delete(RoomModel roomModel)
    {
        roomModelRepository.delete(roomModel);
        return;
    }

    public Boolean existsByStreamer(String streamer) {
        return roomModelRepository.existsByStreamer(streamer);
    }
    public RoomModel findByStreamer(String streamer)
    {
        return roomModelRepository.findByStreamer(streamer);
    }



}
