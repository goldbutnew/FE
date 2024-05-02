package ving.spring.ving.video;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import ving.spring.ving.user.UserModel;

import java.util.List;

@Repository
@Configuration
@EnableJpaRepositories(basePackages = "com.example.myapp.jpa.repository")
public interface VideoRepository extends JpaRepository<VideoModel, Integer> {

    public VideoModel findByVideoId(Integer videoId);

    public List<VideoModel> findVideoModelsByUser(UserModel userModel);
}
