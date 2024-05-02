package ving.spring.ving.streamRoom;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import ving.spring.ving.user.UserModel;

import java.util.Optional;

@Repository
@Configuration
@EnableJpaRepositories(basePackages = "com.example.myapp.jpa.repository")
public interface StreamRoomRepository extends JpaRepository<StreamRoomModel, Integer> {
    public Optional<StreamRoomModel> findStreamRoomModelByStreamerAndIsEnd(UserModel streamer, Boolean isEnd);
}
