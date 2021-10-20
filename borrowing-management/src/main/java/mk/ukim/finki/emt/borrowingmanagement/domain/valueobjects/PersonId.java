package mk.ukim.finki.emt.borrowingmanagement.domain.valueobjects;

import lombok.NonNull;
import mk.ukim.finki.emt.sharedkernel.domain.base.DomainObjectId;

import javax.persistence.Embeddable;

@Embeddable
public class PersonId extends DomainObjectId {

    protected PersonId() {
        super(PersonId.randomId(PersonId.class).getId());
    }

    public PersonId(@NonNull String uuid) {
        super(uuid);
    }

    public static PersonId of(String uuid) {
        return new PersonId(uuid);
    }
}
