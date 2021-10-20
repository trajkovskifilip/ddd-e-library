package mk.ukim.finki.emt.borrowingmanagement.service.forms;

import lombok.Getter;
import mk.ukim.finki.emt.borrowingmanagement.domain.valueobjects.Book;
import mk.ukim.finki.emt.borrowingmanagement.domain.valueobjects.Person;

import javax.validation.constraints.NotNull;

@Getter
public class BorrowingForm {

    @NotNull
    private Book book;

    @NotNull
    private Person person;
}
