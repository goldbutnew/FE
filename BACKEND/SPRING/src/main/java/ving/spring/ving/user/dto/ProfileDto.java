package ving.spring.ving.user.dto;

import jdk.dynalink.beans.StaticClass;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ving.spring.ving.video.VideoDto;
import java.util.List;

@Builder
@Getter
@Setter
public class ProfileDto {
    private String nickname;
    private String photoUrl;
    private String introduction;
    private Integer followers;
    private List<VideoDto.VideoEntity> videos;
    private Boolean isFollowed;
    private List<String> links;




}
