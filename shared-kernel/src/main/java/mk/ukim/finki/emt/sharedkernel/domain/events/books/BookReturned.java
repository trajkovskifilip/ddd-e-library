package mk.ukim.finki.emt.sharedkernel.domain.events.books;

import lombok.Getter;
import mk.ukim.finki.emt.sharedkernel.domain.config.TopicHolder;
import mk.ukim.finki.emt.sharedkernel.domain.events.DomainEvent;

@Getter
public class BookReturned extends DomainEvent {

    private String bookId;

    public BookReturned() {
        super(TopicHolder.TOPIC_BOOK_RETURNED);
    }

    public BookReturned(String bookId) {
        super(TopicHolder.TOPIC_BOOK_RETURNED);
        this.bookId = bookId;
    }
}
