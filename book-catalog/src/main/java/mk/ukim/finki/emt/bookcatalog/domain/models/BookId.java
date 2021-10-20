package mk.ukim.finki.emt.bookcatalog.domain.models;

import mk.ukim.finki.emt.sharedkernel.domain.base.DomainObjectId;

public class BookId extends DomainObjectId {

    private BookId() {
        super(BookId.randomId(BookId.class).getId());
    }

    public BookId(String uuid) {
        super(uuid);
    }

    public static BookId of(String uuid) {
        return new BookId(uuid);
    }
}
