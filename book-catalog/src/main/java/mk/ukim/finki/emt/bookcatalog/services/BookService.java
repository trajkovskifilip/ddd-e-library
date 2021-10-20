package mk.ukim.finki.emt.bookcatalog.services;

import mk.ukim.finki.emt.bookcatalog.domain.enums.Genre;
import mk.ukim.finki.emt.bookcatalog.domain.models.*;
import mk.ukim.finki.emt.bookcatalog.services.form.AuthorForm;
import mk.ukim.finki.emt.bookcatalog.services.form.BookEditForm;
import mk.ukim.finki.emt.bookcatalog.services.form.BookForm;

import java.util.List;

public interface BookService {

    Book findBookById(String bookId);

    Author findAuthorById(String authorId);

    List<Book> findAllBooks();

    List<Author> findAllAuthors();

    List<Book> findAllBooksByAuthor(String authorId);

    List<Book> findAllBooksByGenre(Genre genre);

    Integer getTotalNumberOfCopies(String bookId);

    Integer getNumberOfAvailableCopies(String bookId);

    Book borrowBookCopy(BookId bookId);

    Book returnBookCopy(BookId bookId);

    Book addNewBookCopies(String bookId, Integer numberOfNewCopies);

    Book createBook(BookForm bookForm);

    void updateBook(String bookId, BookEditForm bookEditForm);

    Author createAuthor(AuthorForm authorForm);

    void updateAuthor(String authorId, AuthorForm authorForm);

    List<Genre> getAllGenres();
}
