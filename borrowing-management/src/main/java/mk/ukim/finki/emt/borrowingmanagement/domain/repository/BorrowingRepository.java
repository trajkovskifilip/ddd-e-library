package mk.ukim.finki.emt.borrowingmanagement.domain.repository;

import mk.ukim.finki.emt.borrowingmanagement.domain.models.Borrowing;
import mk.ukim.finki.emt.borrowingmanagement.domain.models.BorrowingId;
import mk.ukim.finki.emt.borrowingmanagement.domain.valueobjects.BookId;
import mk.ukim.finki.emt.borrowingmanagement.domain.valueobjects.PersonId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BorrowingRepository extends JpaRepository<Borrowing, BorrowingId> {

    List<Borrowing> findByPersonId(PersonId personId);

    List<Borrowing> findByBookId(BookId bookId);
}
