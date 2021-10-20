package mk.ukim.finki.emt.personmanagement.domain.valueobjects;

import lombok.Getter;
import lombok.NonNull;
import mk.ukim.finki.emt.sharedkernel.domain.base.ValueObject;

import javax.persistence.Embeddable;

@Embeddable
@Getter
public class Address implements ValueObject {

    private final String streetName;

    private final String streetNumber;

    private final String city;

    private final String postcode;

    protected Address() {
        this.streetName = "";
        this.streetNumber = "";
        this.city = "";
        this.postcode = "";
    }

    public Address(@NonNull String streetName, @NonNull String streetNumber, @NonNull String city, @NonNull String postcode) {
        this.streetName = streetName;
        this.streetNumber = streetNumber;
        this.city = city;
        this.postcode = postcode;
    }

    public static Address of(String streetName, String streetNumber, String city, String postcode) {
        return new Address(streetName, streetNumber, city, postcode);
    }
}
