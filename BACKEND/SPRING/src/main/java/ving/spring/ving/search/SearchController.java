package ving.spring.ving.search;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ving.spring.ving.user.UserService;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/search")
public class SearchController {

    private final UserService userService;

    @GetMapping("/nickname")
    public ResponseEntity<?> searchNickname(@RequestParam String nickname)
    {
        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }
}
