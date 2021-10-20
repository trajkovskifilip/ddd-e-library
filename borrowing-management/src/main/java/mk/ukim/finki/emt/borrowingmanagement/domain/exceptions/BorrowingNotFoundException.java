package mk.ukim.finki.emt.borrowingmanagement.domain.exceptions;

import mk.ukim.finki.emt.borrowingmanagement.domain.models.BorrowingId;

public class BorrowingNotFoundException extends RuntimeException {

    public BorrowingNotFoundException(BorrowingId borrowingId) {
        super(String.format("Borrowing with id [%s] was not found.", borrowingId.getId()));
    }
}
