package mk.ukim.finki.emt.borrowingmanagement.service.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.emt.borrowingmanagement.domain.exceptions.BorrowingNotFoundException;
import mk.ukim.finki.emt.borrowingmanagement.domain.exceptions.MaximumNumberOfBorrowingItemsExceededException;
import mk.ukim.finki.emt.borrowingmanagement.domain.models.Borrowing;
import mk.ukim.finki.emt.borrowingmanagement.domain.models.BorrowingId;
import mk.ukim.finki.emt.borrowingmanagement.domain.repository.BorrowingRepository;
import mk.ukim.finki.emt.borrowingmanagement.domain.valueobjects.Book;
import mk.ukim.finki.emt.borrowingmanagement.domain.valueobjects.BookId;
import mk.ukim.finki.emt.borrowingmanagement.domain.valueobjects.Person;
import mk.ukim.finki.emt.borrowingmanagement.domain.valueobjects.PersonId;
import mk.ukim.finki.emt.borrowingmanagement.service.BorrowingService;
import mk.ukim.finki.emt.borrowingmanagement.service.forms.BorrowingForm;
import mk.ukim.finki.emt.sharedkernel.domain.events.books.BookBorrowed;
import mk.ukim.finki.emt.sharedkernel.domain.events.books.BookReturned;
import mk.ukim.finki.emt.sharedkernel.domain.financial.Currency;
import mk.ukim.finki.emt.sharedkernel.domain.financial.Money;
import mk.ukim.finki.emt.sharedkernel.infra.DomainEventPublisher;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class BorrowingServiceImpl implements BorrowingService {

    private final BorrowingRepository borrowingRepository;
    private final DomainEventPublisher domainEventPublisher;

    @Override
    public List<Borrowing> findAllBorrowings() {
        return this.borrowingRepository.findAll();
    }

    @Override
    public Borrowing findBorrowingById(String borrowingIdString) {
        BorrowingId borrowingId = BorrowingId.of(borrowingIdString);
        return this.borrowingRepository.findById(borrowingId).orElseThrow(() -> new BorrowingNotFoundException(borrowingId));
    }

    @Override
    public List<Borrowing> findAllBorrowingsByPersonId(String personIdString) {
        PersonId personId = PersonId.of(personIdString);
        return this.borrowingRepository.findByPersonId(personId);
    }

    @Override
    public List<Borrowing> findAllBorrowingsByBookId(String bookIdString) {
        BookId bookId = BookId.of(bookIdString);
        return this.borrowingRepository.findByBookId(bookId);
    }

    @Override
    public void borrowBook(BorrowingForm borrowingForm) {
        Person person = borrowingForm.getPerson();
        Book book = borrowingForm.getBook();
        List<Borrowing> borrowingsByPerson = this.borrowingRepository.findByPersonId(person.getId());
        List<Borrowing> activeBorrowingsByPerson = borrowingsByPerson.stream().filter(b -> Objects.isNull(b.getEndDate()))
                                                        .collect(Collectors.toList());
        if (activeBorrowingsByPerson.size() < 5) {
            Borrowing newBorrowing = new Borrowing(person, book);
            borrowingRepository.saveAndFlush(newBorrowing);
            domainEventPublisher.publish(new BookBorrowed(book.getId().getId()));
        }
        else {
            throw new MaximumNumberOfBorrowingItemsExceededException();
        }
    }

    @Override
    public void returnBook(String borrowingIdString) {
        Borrowing borrowing = this.findBorrowingById(borrowingIdString);
        borrowing.returnBook();
        domainEventPublisher.publish(new BookReturned(borrowing.getBookId().getId()));
    }

    @Override
    public void deletePaidBorrowing(String borrowingIdString) {
        Borrowing borrowing = this.findBorrowingById(borrowingIdString);
        this.borrowingRepository.delete(borrowing);
    }

    @Override
    public Money calculateTotalSumForPerson(String personIdString) {
        List<Borrowing> allBorrowings = this.findAllBorrowingsByPersonId(personIdString);
        return allBorrowings.stream().map(Borrowing::total).reduce(new Money(Currency.MKD, 0d), Money::add);
    }
}
