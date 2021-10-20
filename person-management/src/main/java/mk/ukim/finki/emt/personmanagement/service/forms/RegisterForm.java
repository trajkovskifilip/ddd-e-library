package mk.ukim.finki.emt.personmanagement.service.forms;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class RegisterForm {

    @NotNull
    private String username;

    @NotNull
    private String password;

    @NotNull
    private String repeatPassword;

    @NotNull
    private String name;

    @NotNull
    private String surname;

    @NotNull
    private Integer birthYear;

    @NotNull
    private String streetName;

    @NotNull
    private String streetNumber;

    @NotNull
    private String city;

    @NotNull
    private String postcode;

    @NotNull
    private String email;

    @NotNull
    private String phoneNumber;
}
