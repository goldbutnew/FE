package ving.spring.ving.video.fixedVideo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ving.spring.ving.user.UserModel;

@Service
@RequiredArgsConstructor
public class FixedVideoService {
     private final FixedVideoRepository fixedVideoRepository;

     public FixedVideoModel create(FixedVideoModel fixedVideoModel)
     {
         return fixedVideoRepository.save(fixedVideoModel);
     }
     public boolean existsByUserModel(UserModel userModel)
     {
          return fixedVideoRepository.existsByUserModel(userModel);
     }
     public void deleteByUserModel(UserModel userModel)
     {
          fixedVideoRepository.deleteByUserModel(userModel);
     }
}
