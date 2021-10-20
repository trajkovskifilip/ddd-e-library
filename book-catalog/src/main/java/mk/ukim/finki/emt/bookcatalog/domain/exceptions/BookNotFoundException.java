package mk.ukim.finki.emt.bookcatalog.domain.exceptions;

import mk.ukim.finki.emt.bookcatalog.domain.models.BookId;

public class BookNotFoundException extends RuntimeException {

    public BookNotFoundException(BookId bookId) {
        super(String.format("Book with id [%s] not found", bookId.getId()));
    }
}
