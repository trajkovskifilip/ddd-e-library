package mk.ukim.finki.emt.bookcatalog.domain.valueobjects;

import lombok.Getter;
import lombok.NonNull;
import mk.ukim.finki.emt.sharedkernel.domain.base.ValueObject;

import javax.persistence.Embeddable;

@Embeddable
@Getter
public class ISBN implements ValueObject {

    private final String isbn;

    private static final String SIMPLE_ISBN_CHECK = "^\\d{9}[\\d|X]$";

    protected ISBN() {
        this.isbn = "0";
    }

    public ISBN(@NonNull String isbn) {
        if (!isbn.trim().matches(SIMPLE_ISBN_CHECK)) {
            throw new IllegalArgumentException("Wrong ISBN!");
        }
        this.isbn = isbn.trim();
    }

    public static ISBN of(String isbn) {
        return new ISBN(isbn);
    }
}
