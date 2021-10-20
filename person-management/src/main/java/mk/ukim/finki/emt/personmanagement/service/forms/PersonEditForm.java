package mk.ukim.finki.emt.personmanagement.service.forms;

import lombok.Getter;
import mk.ukim.finki.emt.personmanagement.domain.valueobjects.Address;
import mk.ukim.finki.emt.personmanagement.domain.valueobjects.ContactInformation;

@Getter
public class PersonEditForm {

    private Address address;

    private ContactInformation contactInformation;
}
