package mk.ukim.finki.emt.sharedkernel.domain.events;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;

import java.time.Instant;

@Getter
public class DomainEvent {

    private final String topic;
    private final String occurredOn;

    public DomainEvent() {
        this.topic = "";
        this.occurredOn = Instant.now().toString();
    }

    public DomainEvent(String topic) {
        this.topic = topic;
        this.occurredOn = Instant.now().toString();
    }

    public String toJson() {
        ObjectMapper objectMapper = new ObjectMapper();
        String output = null;
        try {
            output = objectMapper.writeValueAsString(this);
        } catch (JsonProcessingException ex) {

        }
        return output;
    }

    public String topic() {
        return topic;
    }

    public static <E extends DomainEvent> E fromJson(String json, Class<E> eventClass) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(json, eventClass);
    }
}
