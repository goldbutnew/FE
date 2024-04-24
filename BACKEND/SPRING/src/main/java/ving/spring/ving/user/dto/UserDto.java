package ving.spring.ving.user.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
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
