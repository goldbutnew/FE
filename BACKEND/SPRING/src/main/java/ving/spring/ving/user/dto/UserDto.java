package ving.spring.ving.user.dto;


import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto
{
    List<user> users;

    @Builder
    @Getter
    public static class user
    {
        private String nickname;
        private String photoUrl;
    }
}
