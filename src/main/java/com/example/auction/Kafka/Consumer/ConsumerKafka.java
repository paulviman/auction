package com.example.auction.Kafka.Consumer;

import com.example.auction.Kafka.Model.KafkaModel;
import com.example.auction.Kafka.Constants.KafkaConstants;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

@Service
public class ConsumerKafka {
    @Payload(required = false)
    @KafkaListener(topics = KafkaConstants.KAFKA_TOPIC, groupId = KafkaConstants.GROUP_ID)
    public void listenToTopic(KafkaModel model) {
        System.out.println("Message received is " + model.toString());
    }
}

