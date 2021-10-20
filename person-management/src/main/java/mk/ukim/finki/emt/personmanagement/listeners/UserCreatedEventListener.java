package mk.ukim.finki.emt.personmanagement.listeners;

import mk.ukim.finki.emt.personmanagement.domain.events.UserCreatedEvent;
import mk.ukim.finki.emt.personmanagement.domain.valueobjects.Address;
import mk.ukim.finki.emt.personmanagement.domain.valueobjects.ContactInformation;
import mk.ukim.finki.emt.personmanagement.service.PersonService;
import mk.ukim.finki.emt.personmanagement.service.forms.RegisterForm;
import mk.ukim.finki.emt.sharedkernel.domain.personaldata.PersonalData;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class UserCreatedEventListener {

    private final PersonService personService;

    public UserCreatedEventListener(PersonService personService) {
        this.personService = personService;
    }

    @EventListener
    public void onUserCreated(UserCreatedEvent userCreatedEvent) {
        RegisterForm data = (RegisterForm) userCreatedEvent.getSource();
        personService.createPerson(PersonalData.of(data.getName(), data.getSurname(), data.getBirthYear()),
                                   Address.of(data.getStreetName(), data.getStreetNumber(), data.getCity(), data.getPostcode()),
                                   ContactInformation.of(data.getEmail(), data.getPhoneNumber()),
                                   data.getUsername());
    }
}
