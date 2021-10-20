package mk.ukim.finki.emt.borrowingmanagement.domain.valueobjects;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import mk.ukim.finki.emt.sharedkernel.domain.base.ValueObject;
import mk.ukim.finki.emt.sharedkernel.domain.financial.Currency;
import mk.ukim.finki.emt.sharedkernel.domain.financial.Money;

@Getter
public class Book implements ValueObject {

    private final BookId id;
    private final String title;
    private final Money price;

    protected Book() {
        this.id = BookId.randomId(BookId.class);
        this.title = "";
        this.price = Money.valueOf(Currency.MKD, 0d);
    }

    @JsonCreator
    public Book(@JsonProperty("id") BookId id,
                @JsonProperty("title") String title,
                @JsonProperty("price") Money price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }
}
