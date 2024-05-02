package ving.spring.ving.streamRoom.alarm;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ving.spring.ving.subscription.SubscriptionModel;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlarmService {

    private final AlarmRepository alarmRepository;

    public AlarmModel save(AlarmModel alarmModel)
    {
        return alarmRepository.save(alarmModel);
    }

    public List<AlarmModel> findAlarmModelsBySubscriptionModel(SubscriptionModel subscriptionModel)
    {
        return  alarmRepository.findAlarmModelsBySubscriptionModel(subscriptionModel);
    }
}
