package mk.ukim.finki.emt.personmanagement.domain.exceptions;

import mk.ukim.finki.emt.personmanagement.domain.models.PersonId;

public class PersonNotFoundException extends RuntimeException {

    public PersonNotFoundException(PersonId personId) {
        super(String.format("Person with id [%s] not found", personId.getId()));
    }
}
