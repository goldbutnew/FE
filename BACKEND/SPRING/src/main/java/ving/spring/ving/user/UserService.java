package ving.spring.ving.user;

import com.fasterxml.jackson.databind.RuntimeJsonMappingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ving.spring.ving.user.UserRepository;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    public boolean existsByUserUsername(String email)
    {
        return userRepository.existsByUserUsername(email);
    }

    public Optional<UserModel> findByUserUsername(String userUserName)
    {
        return Optional.of(userRepository.findByUserUsername(userUserName));
    }

    public UserModel create(final UserModel userModel)
    {
        if (userModel == null || userModel.getUserUsername() == null)
        {
            throw new RuntimeJsonMappingException("Invalid argument");
        }
        final String userUsername = userModel.getUserUsername();
        if (userRepository.existsByUserUsername(userUsername))
        {
            log.warn("이미 있는 유저임");
            throw new RuntimeJsonMappingException("이미 있는 유저입니다");
        }
        return userRepository.save(userModel);
    }
}
