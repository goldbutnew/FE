package ving.spring.ving.search;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

public class SearchDto {

    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    public static class SearchAll
    {
        List<SemiProfile> users;
    }
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    public static class SemiProfile {
        private String username;
        private String nickname;
        private String thumbnail;
    }
}
