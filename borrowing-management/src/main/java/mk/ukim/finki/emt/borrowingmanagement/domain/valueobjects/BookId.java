package mk.ukim.finki.emt.borrowingmanagement.domain.valueobjects;

import lombok.NonNull;
import mk.ukim.finki.emt.sharedkernel.domain.base.DomainObjectId;

import javax.persistence.Embeddable;


@Embeddable
public class BookId extends DomainObjectId {

    protected BookId() {
        super(BookId.randomId(BookId.class).getId());
    }

    public BookId(@NonNull String uuid) {
        super(uuid);
    }

    public static BookId of(String uuid) {
        return new BookId(uuid);
    }
}
