package ving.spring.ving.streamRoom;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ving.spring.ving.user.UserModel;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StreamRoomService {
    private final StreamRoomRepository streamRoomRepository;

    public StreamRoomModel findStreamRoomModelByStreamerAndIsEnd(UserModel streamer)
    {
        return streamRoomRepository.findStreamRoomModelByStreamerAndIsEnd(streamer, false).orElseThrow();
    }

    public List<StreamRoomModel> findAll()
    {
        return streamRoomRepository.findStreamRoomModelsByIsEnd(false);
    }

    public StreamRoomModel save(StreamRoomModel streamRoomModel)
    {
        return streamRoomRepository.save(streamRoomModel);
    }
}
