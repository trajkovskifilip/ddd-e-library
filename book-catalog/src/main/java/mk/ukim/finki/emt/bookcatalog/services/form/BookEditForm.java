package mk.ukim.finki.emt.bookcatalog.services.form;

import lombok.Getter;
import mk.ukim.finki.emt.bookcatalog.domain.enums.Genre;
import mk.ukim.finki.emt.bookcatalog.domain.models.Author;
import mk.ukim.finki.emt.bookcatalog.domain.valueobjects.ISBN;
import mk.ukim.finki.emt.sharedkernel.domain.financial.Money;

@Getter
public class BookEditForm {

    private ISBN isbn;

    private String title;

    private String authorId;

    private Genre genre;

    private String description;

    private Integer publishingYear;

    private Integer numberOfPages;

    private Integer numberOfNewCopies;

    private Money price;
}
