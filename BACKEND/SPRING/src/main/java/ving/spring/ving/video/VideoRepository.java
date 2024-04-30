package ving.spring.ving.video;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ving.spring.ving.user.UserModel;

import java.util.List;

@Repository
public interface VideoRepository extends JpaRepository<VideoModel, Integer> {

    public VideoModel findByVideoId(Integer videoId);

    public List<VideoModel> findVideoModelsByUser(UserModel userModel);
}
