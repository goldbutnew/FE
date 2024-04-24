package ving.spring.ving.video.fixedVideo;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ving.spring.ving.user.UserModel;

@Repository
public interface FixedVideoRepository extends JpaRepository<FixedVideoModel, Integer> {

    public boolean existsByUserModel(UserModel userModel);

    @Transactional
    public void deleteByUserModel(UserModel userModel);
}
