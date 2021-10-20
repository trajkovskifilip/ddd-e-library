package mk.ukim.finki.emt.personmanagement.domain.valueobjects;

import lombok.Getter;
import lombok.NonNull;
import mk.ukim.finki.emt.sharedkernel.domain.base.ValueObject;

import javax.persistence.Embeddable;

@Embeddable
@Getter
public class ContactInformation implements ValueObject {

    private final String email;

    private final String phoneNumber;

    protected ContactInformation() {
        this.email = "";
        this.phoneNumber = "";
    }

    public ContactInformation(@NonNull String email, @NonNull String phoneNumber) {
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    public static ContactInformation of(String email, String phoneNumber) {
        return new ContactInformation(email, phoneNumber);
    }
}
