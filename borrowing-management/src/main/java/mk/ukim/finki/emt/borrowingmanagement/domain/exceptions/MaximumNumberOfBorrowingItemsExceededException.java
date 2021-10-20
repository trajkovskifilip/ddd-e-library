package mk.ukim.finki.emt.borrowingmanagement.domain.exceptions;

public class MaximumNumberOfBorrowingItemsExceededException extends RuntimeException {

    public MaximumNumberOfBorrowingItemsExceededException() {
        super("Maximum number of borrowing items exceeded!");
    }
}
