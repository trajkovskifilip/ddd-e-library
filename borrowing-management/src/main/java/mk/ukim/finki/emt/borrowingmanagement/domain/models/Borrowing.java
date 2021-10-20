package mk.ukim.finki.emt.borrowingmanagement.domain.models;

import lombok.Getter;

import lombok.NonNull;
import mk.ukim.finki.emt.borrowingmanagement.domain.valueobjects.Book;
import mk.ukim.finki.emt.borrowingmanagement.domain.valueobjects.BookId;
import mk.ukim.finki.emt.borrowingmanagement.domain.valueobjects.Person;
import mk.ukim.finki.emt.borrowingmanagement.domain.valueobjects.PersonId;
import mk.ukim.finki.emt.sharedkernel.domain.base.AbstractEntity;
import mk.ukim.finki.emt.sharedkernel.domain.financial.Currency;
import mk.ukim.finki.emt.sharedkernel.domain.financial.Money;

import javax.persistence.*;
import java.time.temporal.ChronoUnit;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Getter
public class Borrowing extends AbstractEntity<BorrowingId> {

    private LocalDate startDate;

    private LocalDate endDate;

    private String title;

    private String username;

    private Money borrowingPrice;

    @AttributeOverride(name = "id", column = @Column(name = "person_id", nullable = false))
    private PersonId personId;

    @AttributeOverride(name="id", column = @Column(name = "book_id", nullable = false))
    private BookId bookId;

    protected Borrowing() {
        super(BorrowingId.randomId(BorrowingId.class));
    }

    public Borrowing(@NonNull Person person, @NonNull Book book) {
        super(BorrowingId.randomId(BorrowingId.class));
        this.personId = person.getId();
        this.username = person.getUsername();
        this.bookId = book.getId();
        this.title = book.getTitle();
        this.borrowingPrice = book.getPrice();
        this.startDate = LocalDate.now();
    }

    public void returnBook() {
        this.endDate = LocalDate.now();
    }

    public Money total() {
        long daysBetween;
        if (Objects.isNull(endDate)) {
            daysBetween = ChronoUnit.DAYS.between(startDate, LocalDate.now());
        }
        else {
            daysBetween = ChronoUnit.DAYS.between(startDate, endDate);
        }

        if (daysBetween <= 14) {
            return borrowingPrice;
        }
        else {
             Money penalty = new Money(Currency.MKD, 5d);
             Money totalPenalty = penalty.multiply((int) daysBetween);
             return borrowingPrice.add(totalPenalty);
        }
    }
}
