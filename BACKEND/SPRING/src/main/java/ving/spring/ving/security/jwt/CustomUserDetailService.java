package ving.spring.ving.security.jwt;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;


import lombok.RequiredArgsConstructor;
import ving.spring.ving.security.dto.UserPrincipal;
import ving.spring.ving.user.UserModel;
import ving.spring.ving.user.UserService;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserModel user = userService.findByUserUsername(username).orElseThrow();

        return UserPrincipal.builder()
                .userId(user.getUserId())
                .email(user.getUserUsername())
                .authorities(Collections.emptySet())
                .password(user.getUserPassword())
                .build();
    }
}
