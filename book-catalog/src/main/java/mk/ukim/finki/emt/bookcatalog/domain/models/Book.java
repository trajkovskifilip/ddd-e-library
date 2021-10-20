package mk.ukim.finki.emt.bookcatalog.domain.models;

import lombok.Getter;
import mk.ukim.finki.emt.bookcatalog.domain.enums.Genre;
import mk.ukim.finki.emt.bookcatalog.domain.valueobjects.ISBN;
import mk.ukim.finki.emt.sharedkernel.domain.base.AbstractEntity;
import mk.ukim.finki.emt.sharedkernel.domain.financial.Money;

import javax.persistence.*;

@Entity
@Getter
public class Book extends AbstractEntity<BookId> {

    private ISBN isbn;

    private String title;

    @ManyToOne
    private Author author;

    @Enumerated(EnumType.STRING)
    private Genre genre;

    private String description;

    private Money price;

    private Integer publishingYear;

    private Integer numberOfPages;

    private Integer numberOfCopies;

    private Integer numberOfAvailableCopies;

    protected Book() {
        super(BookId.randomId(BookId.class));
    }

    public static Book build(ISBN isbn, String title, Author author, Genre genre, String description, Integer publishingYear,
                             Integer numberOfPages, Integer numberOfCopies, Integer numberOfAvailableCopies, Money price) {
        Book book = new Book();
        book.isbn = isbn;
        book.title = title;
        book.author = author;
        book.genre = genre;
        book.description = description;
        book.publishingYear = publishingYear;
        book.numberOfPages = numberOfPages;
        book.numberOfCopies = numberOfCopies;
        book.numberOfAvailableCopies = numberOfAvailableCopies;
        book.price = price;
        return book;
    }

    public void addCopies(Integer quantity) {
        this.numberOfCopies += quantity;
        this.numberOfAvailableCopies += quantity;
    }

    public void borrowBookCopy() {
        this.numberOfAvailableCopies--;
    }

    public void returnBookCopy() {
        this.numberOfAvailableCopies++;
    }
}
