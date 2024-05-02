package ving.spring.ving.video.fixedVideo;

import jakarta.transaction.Transactional;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;
import ving.spring.ving.user.UserModel;
import ving.spring.ving.video.VideoModel;

@Repository
public interface FixedVideoRepository extends JpaRepository<FixedVideoModel, Integer> {

    public boolean existsByUserModel(UserModel userModel);
    public boolean existsByVideoModel(VideoModel videoModel);
    @Transactional
    public void deleteByUserModel(UserModel userModel);
}
