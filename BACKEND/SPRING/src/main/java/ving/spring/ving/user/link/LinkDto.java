package ving.spring.ving.user.link;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@Getter
public class LinkDto {
    private String url;
    private String title;
}
