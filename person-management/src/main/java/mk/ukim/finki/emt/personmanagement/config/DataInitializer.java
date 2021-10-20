package mk.ukim.finki.emt.personmanagement.config;

import lombok.AllArgsConstructor;
import mk.ukim.finki.emt.personmanagement.domain.enums.Role;
import mk.ukim.finki.emt.personmanagement.domain.models.Person;
import mk.ukim.finki.emt.personmanagement.domain.models.User;
import mk.ukim.finki.emt.personmanagement.domain.repository.PersonRepository;
import mk.ukim.finki.emt.personmanagement.domain.repository.UserRepository;
import mk.ukim.finki.emt.personmanagement.domain.valueobjects.Address;
import mk.ukim.finki.emt.personmanagement.domain.valueobjects.ContactInformation;
import mk.ukim.finki.emt.sharedkernel.domain.personaldata.PersonalData;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Arrays;

@Component
@AllArgsConstructor
public class DataInitializer {

    private final PersonRepository personRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void initData() {
        User user1 = User.build("filip.trajkovski", passwordEncoder.encode("ftr"), "Filip", "Trajkovski", Role.ROLE_PATRON);
        User user2 = User.build("admin", passwordEncoder.encode("admin"), "Admin", "Admin", Role.ROLE_ADMIN);

        Person person1 = Person.build(PersonalData.of("Filip", "Trajkovski", 1999),
                                      Address.of("Street", "10", "Skopje", "1000"),
                                      ContactInformation.of("test.mail@gmail.com", "070123456"),
                                      user1);
        Person person2 = Person.build(PersonalData.of("Admin", "Admin", 1980),
                Address.of("Street", "20", "Skopje", "1000"),
                ContactInformation.of("test.mail@gmail.com", "070987654"),
                user2);

        if (this.userRepository.findAll().isEmpty()) {
            this.userRepository.saveAll(Arrays.asList(user1, user2));
        }

        if (this.personRepository.findAll().isEmpty()) {
            this.personRepository.saveAll(Arrays.asList(person1, person2));
        }
    }
}
