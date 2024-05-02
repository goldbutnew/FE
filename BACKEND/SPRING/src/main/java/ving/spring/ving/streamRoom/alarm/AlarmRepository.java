package ving.spring.ving.streamRoom.alarm;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ving.spring.ving.subscription.SubscriptionModel;

import java.util.List;

@Repository
public interface AlarmRepository extends JpaRepository<AlarmModel, Integer> {

    List<AlarmModel> findAlarmModelsBySubscriptionModel(SubscriptionModel subscriptionModel);
}
