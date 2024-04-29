package ving.spring.ving.user;

import org.apache.catalina.User;
import ving.spring.ving.user.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Integer> {
        public boolean existsByUserUsername(String userName);
        public UserModel findByUserUsername(String userUserName);

        public Optional<UserModel> findByUserId(Integer userId);

        public List<UserModel> findUserModelsByUserNicknameStartingWith(String userNickname);

}

