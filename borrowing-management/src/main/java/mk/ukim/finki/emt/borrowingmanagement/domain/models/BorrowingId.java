package mk.ukim.finki.emt.borrowingmanagement.domain.models;

import mk.ukim.finki.emt.sharedkernel.domain.base.DomainObjectId;

public class BorrowingId extends DomainObjectId {

    private BorrowingId() {
        super(BorrowingId.randomId(BorrowingId.class).getId());
    }

    public BorrowingId(String uuid) {
        super(uuid);
    }

    public static BorrowingId of(String uuid) {
        return new BorrowingId(uuid);
    }
}
