package ving.spring.ving.user.link;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ving.spring.ving.user.UserModel;

import java.util.List;

@Repository
public interface LinkRepository extends JpaRepository<LinkModel, Integer> {
    LinkModel findLinkModelByUrlAndUserModel(String url, UserModel userModel);
    List<LinkModel> findLinkModelsByUserModel(UserModel userModel);
}
