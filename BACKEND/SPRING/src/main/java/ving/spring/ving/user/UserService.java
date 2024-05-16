package ving.spring.ving.user;

import com.fasterxml.jackson.databind.RuntimeJsonMappingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import ving.spring.ving.user.UserRepository;

import java.util.List;
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

    public List<UserModel> findAllUser()
    {
        return userRepository.findAll();
    }
    public List<UserModel> findUserModelsByUserNicknameStartingWith(String userNickname)
    {
        return userRepository.findUserModelsByUserNicknameStartingWith(userNickname);
    }
    public Optional<UserModel> findByUserId(Integer userId)
    {
        return userRepository.findByUserId(userId);
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

    public UserModel save(final  UserModel userModel)
    {
        return userRepository.save(userModel);
    }

    public UserModel findCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String username = userDetails.getUsername();
        Optional<UserModel> userOptional = findByUserUsername(username);

        UserModel user = null;
        if (userOptional.isPresent()) {
            user = userOptional.get();
        }
        return user;
    }

    public List<UserModel> findAllByOrderByUserSubscriberCount(int start, int size)
    {
        Pageable pageable = PageRequest.of(start, size);
        Page<UserModel> page = userRepository.findAllByOrderByUserSubscriberCountDesc(pageable);
        return page.getContent();
    }
}
