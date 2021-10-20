package mk.ukim.finki.emt.borrowingmanagement.domain.valueobjects;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import mk.ukim.finki.emt.sharedkernel.domain.base.ValueObject;

@Getter
public class Person implements ValueObject {

    private final PersonId id;
    private final String name;
    private final String surname;
    private final String username;

    protected Person() {
        this.id = PersonId.randomId(PersonId.class);
        this.name = "";
        this.surname = "";
        this.username = "";
    }

    @JsonCreator
    public Person(@JsonProperty("id") PersonId id,
                  @JsonProperty("name") String name,
                  @JsonProperty("surname") String surname,
                  @JsonProperty("username") String username) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.username = username;
    }
}