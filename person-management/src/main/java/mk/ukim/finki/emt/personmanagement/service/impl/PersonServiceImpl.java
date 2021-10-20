package mk.ukim.finki.emt.personmanagement.service.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.emt.personmanagement.domain.enums.Role;
import mk.ukim.finki.emt.personmanagement.domain.events.UserCreatedEvent;
import mk.ukim.finki.emt.personmanagement.domain.exceptions.*;
import mk.ukim.finki.emt.personmanagement.domain.models.Person;
import mk.ukim.finki.emt.personmanagement.domain.models.PersonId;
import mk.ukim.finki.emt.personmanagement.domain.models.User;
import mk.ukim.finki.emt.personmanagement.domain.models.dto.UserDto;
import mk.ukim.finki.emt.personmanagement.domain.repository.PersonRepository;
import mk.ukim.finki.emt.personmanagement.domain.repository.UserRepository;
import mk.ukim.finki.emt.personmanagement.domain.valueobjects.Address;
import mk.ukim.finki.emt.personmanagement.domain.valueobjects.ContactInformation;
import mk.ukim.finki.emt.personmanagement.service.PersonService;
import mk.ukim.finki.emt.personmanagement.service.forms.LoginForm;
import mk.ukim.finki.emt.personmanagement.service.forms.PersonEditForm;
import mk.ukim.finki.emt.personmanagement.service.forms.RegisterForm;
import mk.ukim.finki.emt.sharedkernel.domain.personaldata.PersonalData;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class PersonServiceImpl implements PersonService {

    private final PersonRepository personRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ApplicationEventPublisher applicationEventPublisher;

    @Override
    public Person findById(String personIdString) {
        PersonId personId = PersonId.of(personIdString);
        return this.personRepository.findById(personId).orElseThrow(() -> new PersonNotFoundException(personId));
    }

    @Override
    public List<Person> findAll() {
        return this.personRepository.findAll();
    }

    @Override
    public void update(String personIdString, PersonEditForm personEditForm) {
        personRepository.updateAddressAndContactInformation(PersonId.of(personIdString), personEditForm.getAddress(), personEditForm.getContactInformation());
    }

    @Override
    public void delete(String personIdString) {
        PersonId personId = PersonId.of(personIdString);
        this.personRepository.deleteById(personId);
    }

    @Override
    public UserDto login(LoginForm loginForm) {
        String username = loginForm.getUsername();
        String password = loginForm.getPassword();

        User user = this.findUserByUsername(username);
        if (passwordEncoder.matches(password, user.getPassword())) {
            PersonId personId = this.findPersonForUser(user).getId();
            UserDto userDto = new UserDto(user.getUsername(), user.getPassword(), user.getName(), user.getSurname(), user.getRole(), personId);
            return userDto;
        }
        else {
            throw new InvalidUserCredentialsException();
        }
    }

    @Override
    public void register(RegisterForm registerForm) {
        final String username = registerForm.getUsername();
        final String password = registerForm.getPassword();

        if (!password.equals(registerForm.getRepeatPassword())) {
            throw new PasswordsDoNotMatchException();
        }

        if (this.userRepository.findByUsername(username).isPresent()) {
            throw new UsernameAlreadyExistsException(username);
        }

        User user = new User(username, passwordEncoder.encode(password), registerForm.getName(), registerForm.getSurname(), Role.ROLE_PATRON);
        userRepository.save(user);

        applicationEventPublisher.publishEvent(new UserCreatedEvent(registerForm));
    }

    @Override
    public void createPerson(PersonalData personalData, Address address, ContactInformation contactInformation, String username) {
        User user = this.findUserByUsername(username);
        Person person = Person.build(personalData, address, contactInformation, user);
        this.personRepository.save(person);
    }

    private User findUserByUsername(String username) throws UserNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException(username));
    }

    private Person findPersonForUser(User user) {
        return personRepository.findPersonByUser(user);
    }
}
