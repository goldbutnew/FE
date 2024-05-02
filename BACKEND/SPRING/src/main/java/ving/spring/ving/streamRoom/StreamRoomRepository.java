package ving.spring.ving.streamRoom;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ving.spring.ving.user.UserModel;

import java.util.Optional;

@Repository
public interface StreamRoomRepository extends JpaRepository<StreamRoomModel, Integer> {
    public Optional<StreamRoomModel> findStreamRoomModelByStreamerAndIsEnd(UserModel streamer, Boolean isEnd);
}
