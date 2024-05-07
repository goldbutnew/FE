package ving.spring.ving.streamRoom.alarm;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class AlarmEnumConverter implements AttributeConverter<AlarmEnum, String>  {
    @Override
    public String convertToDatabaseColumn(AlarmEnum alarmEnum) {
        if (alarmEnum == null)
        {
            return null;
        }
        return alarmEnum.name();
    }
    @Override
    public AlarmEnum convertToEntityAttribute(String dbData)
    {
        if (dbData == null)
        {
            return null;
        }
        try {
            return AlarmEnum.valueOf(dbData);
        } catch (IllegalArgumentException e)
        {
            return null;
        }
    }
}
