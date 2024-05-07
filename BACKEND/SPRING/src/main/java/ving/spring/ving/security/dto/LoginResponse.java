package ving.spring.ving.security.dto;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginResponse {
    private final token token;
    private final info info;



    @Getter
    @Builder
    public static class info
    {
        private final String nickname;
        private final String username;
    }
    @Builder
    @Getter
    public static class token {
        private final String accessToken;
        private final String refreshToken;
    }
    @Builder
    @Getter
    public static class isRegistered
    {
        private final boolean isRegistered;
    }
}
