package mk.ukim.finki.emt.borrowingmanagement.service;

import mk.ukim.finki.emt.borrowingmanagement.domain.models.Borrowing;
import mk.ukim.finki.emt.borrowingmanagement.service.forms.BorrowingForm;
import mk.ukim.finki.emt.sharedkernel.domain.financial.Money;

import java.util.List;

public interface BorrowingService {

    List<Borrowing> findAllBorrowings();

    Borrowing findBorrowingById(String borrowingId);

    List<Borrowing> findAllBorrowingsByPersonId(String personId);

    List<Borrowing> findAllBorrowingsByBookId(String bookId);

    void borrowBook(BorrowingForm borrowingForm);

    void returnBook(String borrowingId);

    void deletePaidBorrowing(String borrowingId);

    Money calculateTotalSumForPerson(String personId);
}
