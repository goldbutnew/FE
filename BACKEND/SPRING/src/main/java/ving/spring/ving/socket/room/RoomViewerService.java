package ving.spring.ving.socket.room;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoomViewerService {
    private  final RoomViewerRepository roomViewerRepository;
    public RoomViewerModel save(RoomViewerModel roomViewerModel)
    {
        return roomViewerRepository.save(roomViewerModel);
    }

    public void delete(RoomViewerModel roomViewerModel)
    {
        roomViewerRepository.delete(roomViewerModel);
        return;
    }

    public Boolean existsByStreamerAndSubscriptionId(String streamer, String subscriptionId)
    {
        return roomViewerRepository.existsByStreamerAndSubscriptionId(streamer, subscriptionId);
    }
    public RoomViewerModel findBySubscriptionId(String subscriptionId)
    {
        return roomViewerRepository.findBySubscriptionId(subscriptionId);
    }

}
