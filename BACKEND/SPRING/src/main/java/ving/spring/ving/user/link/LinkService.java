package ving.spring.ving.user.link;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ving.spring.ving.user.UserModel;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LinkService {
    private final LinkRepository linkRepository;

    public LinkModel save(LinkModel linkModel)
    {
        return linkRepository.save(linkModel);
    }
    public void delete(LinkModel linkModel)
    {
        linkRepository.delete(linkModel);
    }

    public LinkModel findLinkModelByUrlAndUserModel(String url, UserModel userModel)
    {
        return linkRepository.findLinkModelByUrlAndUserModel(url, userModel);
    }

    public List<LinkModel> findLinkModelsByUserModel(UserModel userModel)
    {
        return linkRepository.findLinkModelsByUserModel(userModel);
    }
}
