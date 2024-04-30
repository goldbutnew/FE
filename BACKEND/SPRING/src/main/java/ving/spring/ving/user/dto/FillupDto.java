package ving.spring.ving.user.dto;

import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Builder
public class FillupDto {
    private final String nickname;
    private final String introduction;
    private final MultipartFile photo;

    @Builder
    @Getter
    public static class FillupReturnDto {
        private final String nickname;
        private final String introduction;
        private final String photoUrl;
    }
}
