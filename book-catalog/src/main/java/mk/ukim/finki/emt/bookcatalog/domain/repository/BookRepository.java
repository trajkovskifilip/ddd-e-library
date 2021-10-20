package mk.ukim.finki.emt.bookcatalog.domain.repository;

import mk.ukim.finki.emt.bookcatalog.domain.enums.Genre;
import mk.ukim.finki.emt.bookcatalog.domain.models.*;
import mk.ukim.finki.emt.bookcatalog.domain.valueobjects.ISBN;
import mk.ukim.finki.emt.sharedkernel.domain.financial.Money;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, BookId> {

    List<Book> findAllByAuthor(Author author);

    List<Book> findAllByGenre(Genre genre);

    @Modifying
    @Query("UPDATE Book b SET b.isbn = :isbn, b.title = :title, b.author = :author, b.genre = :genre, b.description = :description, b.publishingYear = :publishingYear, b.numberOfPages = :numberOfPages, b.numberOfCopies = :numberOfCopies, b.numberOfAvailableCopies = :numberOfAvailableCopies, b.price = :price WHERE b.id = :id")
    void updateBook(@Param("id") BookId id,
                    @Param("isbn") ISBN isbn,
                    @Param("title") String title,
                    @Param("author") Author author,
                    @Param("genre") Genre genre,
                    @Param("description") String description,
                    @Param("publishingYear") Integer publishingYear,
                    @Param("numberOfPages") Integer numberOfPages,
                    @Param("numberOfCopies") Integer numberOfCopies,
                    @Param("numberOfAvailableCopies") Integer numberOfAvailableCopies,
                    @Param("price") Money price);

}
