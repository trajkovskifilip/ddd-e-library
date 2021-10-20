package mk.ukim.finki.emt.bookcatalog.web;

import lombok.AllArgsConstructor;
import mk.ukim.finki.emt.bookcatalog.domain.enums.Genre;
import mk.ukim.finki.emt.bookcatalog.domain.models.*;
import mk.ukim.finki.emt.bookcatalog.services.BookService;
import mk.ukim.finki.emt.bookcatalog.services.form.AuthorForm;
import mk.ukim.finki.emt.bookcatalog.services.form.BookEditForm;
import mk.ukim.finki.emt.bookcatalog.services.form.BookForm;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
@AllArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping("/books")
    public List<Book> getAllBooks() {
        return bookService.findAllBooks();
    }

    @GetMapping("/books/{id}")
    public ResponseEntity<Book> findBookById(@PathVariable String id) {
        Book book = bookService.findBookById(id);
        return ResponseEntity.ok().body(book);
    }

    @PostMapping("/books/add")
    public Book createBook(@RequestBody BookForm bookForm) {
        return this.bookService.createBook(bookForm);
    }

    @PutMapping("/books/edit/{id}")
    public void edit(@PathVariable String id, @RequestBody BookEditForm bookEditForm) {
        this.bookService.updateBook(id, bookEditForm);
    }

    @GetMapping("/books/genres")
    public List<Genre> getAllGenres() {
        return this.bookService.getAllGenres();
    }

    @GetMapping("/books/genres/{genre}")
    public List<Book> getAllBooksByGenre(@PathVariable Genre genre) {
        return bookService.findAllBooksByGenre(genre);
    }

    @GetMapping("/books/author/{authorId}")
    public List<Book> getAllBooksByAuthor(@PathVariable String authorId) {
        return bookService.findAllBooksByAuthor(authorId);
    }

    @GetMapping("/authors")
    public List<Author> getAllAuthors() {
        return bookService.findAllAuthors();
    }

    @GetMapping("/authors/{id}")
    public ResponseEntity<Author> findAuthorById(@PathVariable String id) {
        Author author = bookService.findAuthorById(id);
        return ResponseEntity.ok().body(author);
    }

    @PostMapping("/authors/add")
    public Author createAuthor(@RequestBody AuthorForm authorForm) {
        return this.bookService.createAuthor(authorForm);
    }

    @PutMapping("/authors/edit/{id}")
    public void editAuthor(@PathVariable String id, @RequestBody AuthorForm authorForm) {
        this.bookService.updateAuthor(id, authorForm);
    }
}
