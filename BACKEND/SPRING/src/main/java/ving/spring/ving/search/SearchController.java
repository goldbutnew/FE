package ving.spring.ving.search;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ving.spring.ving.user.UserModel;
import ving.spring.ving.user.UserService;
import ving.spring.ving.user.dto.ProfileDto;
import ving.spring.ving.user.dto.UserDto;

import java.sql.Array;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
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
        List<SearchDto.SemiProfile> semiProfiles = new ArrayList<>();
        List<UserModel> userModels = userService.findAllUser();
        userModels.forEach( x ->
                semiProfiles.add(
                SearchDto.SemiProfile.builder()
                        .username(x.getUserUsername())
                        .nickname(x.getUserNickname())
                        .thumbnail(x.getUserPhoto())
                        .build()
                )
        );

        return ResponseEntity.ok(SearchDto.SearchAll.builder()
                .users(semiProfiles)
                .build());
    }

    @GetMapping("/streamer")
    public ResponseEntity<?> streamer(@RequestParam int start, @RequestParam int size)
    {
        List<SearchDto.SemiProfile> semiProfiles = new ArrayList<>();
        List<UserModel> userModels = userService.findAllByOrderByUserSubscriberCount(start, size);
        userModels.forEach( x ->
                semiProfiles.add(
                        SearchDto.SemiProfile.builder()
                                .username(x.getUserUsername())
                                .nickname(x.getUserNickname())
                                .thumbnail(x.getUserPhoto())
                                .build()
                )
        );
        return ResponseEntity.ok(SearchDto.SearchAll.builder()
                .users(semiProfiles)
                .build());
    }
}
