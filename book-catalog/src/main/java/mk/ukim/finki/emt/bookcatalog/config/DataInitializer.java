package mk.ukim.finki.emt.bookcatalog.config;

import lombok.AllArgsConstructor;
import mk.ukim.finki.emt.bookcatalog.domain.models.Author;
import mk.ukim.finki.emt.bookcatalog.domain.models.Book;
import mk.ukim.finki.emt.bookcatalog.domain.enums.Genre;
import mk.ukim.finki.emt.bookcatalog.domain.repository.AuthorRepository;
import mk.ukim.finki.emt.bookcatalog.domain.repository.BookRepository;
import mk.ukim.finki.emt.bookcatalog.domain.valueobjects.ISBN;
import mk.ukim.finki.emt.sharedkernel.domain.financial.Currency;
import mk.ukim.finki.emt.sharedkernel.domain.financial.Money;
import mk.ukim.finki.emt.sharedkernel.domain.personaldata.PersonalData;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Arrays;

@Component
@AllArgsConstructor
public class DataInitializer {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;

    @PostConstruct
    public void initData() {
        if (this.authorRepository.findAll().isEmpty() && this.bookRepository.findAll().isEmpty()) {
            Author author1 = Author.build(PersonalData.of("Gillian", "Flynn", 1971));
            Author author2 = Author.build(PersonalData.of("Tracy", "Chevalier", 1962));
            Author author3 = Author.build(PersonalData.of("Nicholas", "Sparks", 1965));

            Author savedAuthor1 = this.authorRepository.save(author1);
            Author savedAuthor2 = this.authorRepository.save(author2);
            Author savedAuthor3 = this.authorRepository.save(author3);

            Book book1 = Book.build(ISBN.of("0307588378"), "Gone Girl", savedAuthor1, Genre.Thriller, "On a warm summer morning in North Carthage, Missouri, it is Nick and Amy Dunne’s fifth wedding anniversary.",
                    2012, 432, 7, 7, Money.valueOf(Currency.MKD, 25.0));
            Book book2 = Book.build(ISBN.of("0307341550"), "Sharp Objects", savedAuthor1, Genre.Mystery, "Fresh from a brief stay at a psych hospital, reporter Camille Preaker faces a troubling assignment.",
                    2006, 254, 3, 3, Money.valueOf(Currency.MKD, 15.0));
            Book book3 = Book.build(ISBN.of("0452282152"), "Girl with a Pearl Earring", savedAuthor2, Genre.Historical, "Tracy Chevalier transports readers to a bygone time and place in this richly-imagined portrait of the young woman who inspired one of Vermeer's most celebrated paintings.",
                    1999, 240, 5, 5, Money.valueOf(Currency.MKD, 15.0));
            Book book4 = Book.build(ISBN.of("0446520802"), "The Notebook", savedAuthor3, Genre.Romance, "Set amid the austere beauty of the North Carolina coast begins the story of Noah Calhoun...",
                    1996, 224, 10, 10, Money.valueOf(Currency.MKD, 20.0));

            this.bookRepository.saveAll(Arrays.asList(book1, book2, book3, book4));
        }
    }
}
