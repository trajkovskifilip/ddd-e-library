package mk.ukim.finki.emt.personmanagement.domain.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import mk.ukim.finki.emt.personmanagement.domain.valueobjects.Address;
import mk.ukim.finki.emt.personmanagement.domain.valueobjects.ContactInformation;
import mk.ukim.finki.emt.sharedkernel.domain.base.AbstractEntity;
import mk.ukim.finki.emt.sharedkernel.domain.personaldata.PersonalData;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

@EqualsAndHashCode(callSuper = true)
@Entity
@Getter
public class Person extends AbstractEntity<PersonId> {

    private PersonalData personalData;

    private Address address;

    private ContactInformation contactInformation;

    @OneToOne
    private User user;

    protected Person() {
        super(PersonId.randomId(PersonId.class));
    }

    public static Person build(PersonalData personalData, Address address, ContactInformation contactInformation, User user) {
        Person person = new Person();
        person.personalData = personalData;
        person.address = address;
        person.contactInformation = contactInformation;
        person.user = user;
        return person;
    }
}
