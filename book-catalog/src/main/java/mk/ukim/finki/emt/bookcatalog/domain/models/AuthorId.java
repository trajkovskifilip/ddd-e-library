package mk.ukim.finki.emt.bookcatalog.domain.models;

import mk.ukim.finki.emt.sharedkernel.domain.base.DomainObjectId;

public class AuthorId extends DomainObjectId {

    protected AuthorId() {
        super(AuthorId.randomId(AuthorId.class).getId());
    }

    public AuthorId(String uuid) {
        super(uuid);
    }

    public static AuthorId of(String uuid) {
        return new AuthorId(uuid);
    }
}
