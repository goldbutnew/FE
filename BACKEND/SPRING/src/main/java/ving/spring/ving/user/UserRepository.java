package ving.spring.ving.user;

import ving.spring.ving.user.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Integer> {
        public boolean existsByUserUsername(String userName);
        public UserModel findByUserUsername(String userUserName);

        public Optional<UserModel> findByUserId(Integer userId);
}

