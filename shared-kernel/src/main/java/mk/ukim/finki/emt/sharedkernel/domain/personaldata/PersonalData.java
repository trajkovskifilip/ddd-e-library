package mk.ukim.finki.emt.sharedkernel.domain.personaldata;

import lombok.Getter;
import lombok.NonNull;
import mk.ukim.finki.emt.sharedkernel.domain.base.ValueObject;

import javax.persistence.Embeddable;

@Embeddable
@Getter
public class PersonalData implements ValueObject {

    private final String name;

    private final String surname;

    private final Integer birthYear;

    protected PersonalData() {
        this.name = "";
        this.surname = "";
        this.birthYear = 0;
    }

    public PersonalData(@NonNull String name, @NonNull String surname, @NonNull Integer birthYear) {
        this.name = name;
        this.surname = surname;
        this.birthYear = birthYear;
    }

    public static PersonalData of(String name, String surname, Integer birthYear) {
        return new PersonalData(name, surname, birthYear);
    }
}
