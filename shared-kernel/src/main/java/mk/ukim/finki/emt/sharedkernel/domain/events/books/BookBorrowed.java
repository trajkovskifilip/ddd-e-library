package mk.ukim.finki.emt.sharedkernel.domain.events.books;

import lombok.Getter;
import mk.ukim.finki.emt.sharedkernel.domain.config.TopicHolder;
import mk.ukim.finki.emt.sharedkernel.domain.events.DomainEvent;

@Getter
public class BookBorrowed extends DomainEvent {

    private String bookId;

    public BookBorrowed() {
        super(TopicHolder.TOPIC_BOOK_BORROWED);
    }

    public BookBorrowed(String bookId) {
        super(TopicHolder.TOPIC_BOOK_BORROWED);
        this.bookId = bookId;
    }
}
