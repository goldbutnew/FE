package ving.spring.ving.search;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ving.spring.ving.user.UserModel;
import ving.spring.ving.user.UserService;
import ving.spring.ving.user.dto.UserDto;

import java.sql.Array;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api/search")
public class SearchController {

    private final UserService userService;

    @GetMapping("/nickname")
    public ResponseEntity<?> searchNickname(@RequestParam String nickname)
    {

        List<UserDto.user> users = new ArrayList<UserDto.user>();
        for (UserModel userModel : userService.findUserModelsByUserNicknameStartingWith(nickname))
        {
            users.add(UserDto.user.builder()
                            .username(userModel.getUserUsername())
                            .nickname(userModel.getUserNickname())
                            .photoUrl(userModel.getUserPhoto())
                    .build());
        }
        return ResponseEntity.ok().body(UserDto.builder()
                        .users(users)
                .build());
    }

    @GetMapping("/all")
    public ResponseEntity<?> searchAll()
    {
        return ResponseEntity.ok(HttpStatus.CREATED);
    }
}
