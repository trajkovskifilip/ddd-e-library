package mk.ukim.finki.emt.personmanagement.domain.models;

import mk.ukim.finki.emt.sharedkernel.domain.base.DomainObjectId;

public class PersonId extends DomainObjectId {

    private PersonId() {
        super(PersonId.randomId(PersonId.class).getId());
    }

    public PersonId(String uuid) {
        super(uuid);
    }

    public static PersonId of(String uuid) {
        return new PersonId(uuid);
    }
}
