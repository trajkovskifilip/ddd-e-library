package mk.ukim.finki.emt.bookcatalog.xport.events;

import mk.ukim.finki.emt.bookcatalog.domain.models.BookId;
import mk.ukim.finki.emt.bookcatalog.services.BookService;
import mk.ukim.finki.emt.sharedkernel.domain.config.TopicHolder;
import mk.ukim.finki.emt.sharedkernel.domain.events.DomainEvent;
import mk.ukim.finki.emt.sharedkernel.domain.events.books.BookBorrowed;
import mk.ukim.finki.emt.sharedkernel.domain.events.books.BookReturned;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class BookEventListener {

    private final BookService bookService;

    public BookEventListener(BookService bookService) {
        this.bookService = bookService;
    }

    @KafkaListener(topics = TopicHolder.TOPIC_BOOK_BORROWED, groupId = "bookCatalog")
    public void consumeBookBorrowedEvent(String jsonMessage) {
        try {
            BookBorrowed event = DomainEvent.fromJson(jsonMessage, BookBorrowed.class);
            this.bookService.borrowBookCopy(BookId.of(event.getBookId()));
        } catch (Exception ex) {

        }
    }

    @KafkaListener(topics = TopicHolder.TOPIC_BOOK_RETURNED, groupId = "bookCatalog")
    public void consumeBookReturnedEvent(String jsonMessage) {
        try {
            BookReturned event = DomainEvent.fromJson(jsonMessage, BookReturned.class);
            this.bookService.returnBookCopy(BookId.of(event.getBookId()));
        } catch (Exception ex) {

        }
    }
}
