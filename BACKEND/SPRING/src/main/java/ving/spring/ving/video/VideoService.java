package ving.spring.ving.video;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ving.spring.ving.user.UserModel;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VideoService {
    private final VideoRepository videoRepository;

    public VideoModel create(VideoModel videoModel)
    {
        return videoRepository.save(videoModel);
    }

    public VideoModel findByVideoId(Integer videoId)
    {
        return videoRepository.findByVideoId(videoId);
    }
    public void delete(VideoModel videoModel)
    {
        videoRepository.delete(videoModel);
    }
    public List<VideoModel> findVideoModelsByUser(UserModel userModel)
    {
        return videoRepository.findVideoModelsByUser(userModel);
    }
}
