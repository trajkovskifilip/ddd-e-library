package mk.ukim.finki.emt.bookcatalog.domain.exceptions;

import mk.ukim.finki.emt.bookcatalog.domain.models.AuthorId;

public class AuthorNotFoundException extends RuntimeException {

    public AuthorNotFoundException(AuthorId authorId) {
        super(String.format("Author with id [%s] not found", authorId.getId()));
    }
}
