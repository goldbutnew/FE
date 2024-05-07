package ving.spring.ving.streamRoom.alarm;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import ving.spring.ving.subscription.SubscriptionModel;

import java.util.List;

@Repository
@Configuration
@EnableJpaRepositories(basePackages = "com.example.myapp.jpa.repository")
public interface AlarmRepository extends JpaRepository<AlarmModel, Integer> {

    List<AlarmModel> findAlarmModelsBySubscriptionModel(SubscriptionModel subscriptionModel);
}
