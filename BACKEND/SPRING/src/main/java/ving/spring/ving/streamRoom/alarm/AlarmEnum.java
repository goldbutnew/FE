package ving.spring.ving.streamRoom.alarm;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public enum AlarmEnum {
    streaming,
    recording;

    public static AlarmEnum toEnum(String val)
    {
        for (AlarmEnum alarmEnum : AlarmEnum.values())
        {
            if (alarmEnum.name().equalsIgnoreCase(val))
            {
                return alarmEnum;
            }
        }
        throw new IllegalArgumentException("잘못된 입력입니다" + val);
    }
}
