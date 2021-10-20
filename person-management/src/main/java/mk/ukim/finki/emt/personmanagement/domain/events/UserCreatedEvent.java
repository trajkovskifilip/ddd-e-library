package mk.ukim.finki.emt.personmanagement.domain.events;

import lombok.Getter;
import mk.ukim.finki.emt.personmanagement.service.forms.RegisterForm;
import org.springframework.context.ApplicationEvent;

@Getter
public class UserCreatedEvent extends ApplicationEvent {

    public UserCreatedEvent(RegisterForm registerForm) {
        super(registerForm);
    }
}
