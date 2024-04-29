package ving.spring.ving.security.dto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Setter
@Getter
public class LoginRequest {
    private String username;
    private String password;

    @Builder
    @Getter
    @Setter
    public static class SignUpRequest
    {
        private String username;
        private String password;
        private String nickname;
    }

}
