package mk.ukim.finki.emt.bookcatalog.services.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.emt.bookcatalog.domain.enums.Genre;
import mk.ukim.finki.emt.bookcatalog.domain.exceptions.AuthorNotFoundException;
import mk.ukim.finki.emt.bookcatalog.domain.exceptions.BookNotFoundException;
import mk.ukim.finki.emt.bookcatalog.domain.models.*;
import mk.ukim.finki.emt.bookcatalog.domain.repository.AuthorRepository;
import mk.ukim.finki.emt.bookcatalog.domain.repository.BookRepository;
import mk.ukim.finki.emt.bookcatalog.services.BookService;
import mk.ukim.finki.emt.bookcatalog.services.form.AuthorForm;
import mk.ukim.finki.emt.bookcatalog.services.form.BookEditForm;
import mk.ukim.finki.emt.bookcatalog.services.form.BookForm;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;

    @Override
    public Book findBookById(String bookIdString) {
        BookId bookId = BookId.of(bookIdString);
        return bookRepository.findById(bookId).orElseThrow(() -> new BookNotFoundException(bookId));
    }

    @Override
    public Author findAuthorById(String authorIdString) {
        AuthorId authorId = AuthorId.of(authorIdString);
        return authorRepository.findById(authorId).orElseThrow(() -> new AuthorNotFoundException(authorId));
    }

    @Override
    public List<Book> findAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public List<Author> findAllAuthors() {
        return authorRepository.findAll();
    }

    @Override
    public List<Book> findAllBooksByAuthor(String authorId) {
        Author author = findAuthorById(authorId);
        return bookRepository.findAllByAuthor(author);
    }

    @Override
    public List<Book> findAllBooksByGenre(Genre genre) {
        return bookRepository.findAllByGenre(genre);
    }

    @Override
    public Integer getTotalNumberOfCopies(String bookId) {
        Book book = this.findBookById(bookId);
        return book.getNumberOfCopies();
    }

    @Override
    public Integer getNumberOfAvailableCopies(String bookId) {
        Book book = this.findBookById(bookId);
        return book.getNumberOfAvailableCopies();
    }

    @Override
    public Book borrowBookCopy(BookId bookId) {
        Book book = this.bookRepository.findById(bookId).orElseThrow(() -> new BookNotFoundException(bookId));
        book.borrowBookCopy();
        bookRepository.saveAndFlush(book);
        return book;
    }

    @Override
    public Book returnBookCopy(BookId bookId) {
        Book book = this.bookRepository.findById(bookId).orElseThrow(() -> new BookNotFoundException(bookId));
        book.returnBookCopy();
        bookRepository.saveAndFlush(book);
        return book;
    }

    @Override
    public Book addNewBookCopies(String bookId, Integer numberOfNewCopies) {
        Book book = this.findBookById(bookId);
        book.addCopies(numberOfNewCopies);
        bookRepository.saveAndFlush(book);
        return book;
    }

    @Override
    public Book createBook(BookForm bookForm) {
        Author author = this.findAuthorById(bookForm.getAuthorId());
        Book book = Book.build(bookForm.getIsbn(),
                               bookForm.getTitle(),
                               author,
                               bookForm.getGenre(),
                               bookForm.getDescription(),
                               bookForm.getPublishingYear(),
                               bookForm.getNumberOfPages(),
                               bookForm.getNumberOfCopies(),
                               bookForm.getNumberOfAvailableCopies(),
                               bookForm.getPrice());
        bookRepository.save(book);
        return book;
    }

    @Override
    public void updateBook(String bookIdString, BookEditForm bookEditForm) {
        Book book = this.findBookById(bookIdString);
        Author author = this.findAuthorById(bookEditForm.getAuthorId());
        this.bookRepository.updateBook(book.getId(),
                bookEditForm.getIsbn(),
                bookEditForm.getTitle(),
                author,
                bookEditForm.getGenre(),
                bookEditForm.getDescription(),
                bookEditForm.getPublishingYear(),
                bookEditForm.getNumberOfPages(),
                book.getNumberOfCopies() + bookEditForm.getNumberOfNewCopies(),
                book.getNumberOfAvailableCopies() + bookEditForm.getNumberOfNewCopies(),
                bookEditForm.getPrice()
                );
    }

    @Override
    public Author createAuthor(AuthorForm authorForm) {
        Author author = Author.build(authorForm.getPersonalData());
        authorRepository.save(author);
        return null;
    }

    @Override
    public void updateAuthor(String authorIdString, AuthorForm authorForm) {
        this.authorRepository.updateAuthor(AuthorId.of(authorIdString), authorForm.getPersonalData());
    }

    @Override
    public List<Genre> getAllGenres() {
        return Arrays.asList(Genre.values());
    }
}
