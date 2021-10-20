package mk.ukim.finki.emt.personmanagement.service;

import mk.ukim.finki.emt.personmanagement.domain.models.Person;
import mk.ukim.finki.emt.personmanagement.domain.models.dto.UserDto;
import mk.ukim.finki.emt.personmanagement.domain.valueobjects.Address;
import mk.ukim.finki.emt.personmanagement.domain.valueobjects.ContactInformation;
import mk.ukim.finki.emt.personmanagement.service.forms.LoginForm;
import mk.ukim.finki.emt.personmanagement.service.forms.PersonEditForm;
import mk.ukim.finki.emt.personmanagement.service.forms.RegisterForm;
import mk.ukim.finki.emt.sharedkernel.domain.personaldata.PersonalData;

import java.util.List;

public interface PersonService {

    Person findById(String personId);

    List<Person> findAll();

    void update(String personId, PersonEditForm personEditForm);

    void delete(String personId);

    UserDto login(LoginForm loginForm);

    void register(RegisterForm registerForm);

    void createPerson(PersonalData personalData, Address address, ContactInformation contactInformation, String username);
}
