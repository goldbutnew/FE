package ving.spring.ving.subscription;

import lombok.*;

@Builder
@Getter
@Setter
public class SubscriptionDto {

    @Builder
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SubscriptRequest
    {
        private Integer userId;
    }

    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SubscriptResponse
    {
        private Integer userId;
    }


    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class DonationRequest
    {
        private String userName;
        private Integer choco;
        private Boolean isTts;
        private String message;
    }
}
