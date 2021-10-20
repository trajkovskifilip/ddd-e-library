package mk.ukim.finki.emt.personmanagement.domain.models.dto;

import lombok.Getter;
import mk.ukim.finki.emt.personmanagement.domain.enums.Role;
import mk.ukim.finki.emt.personmanagement.domain.models.PersonId;

@Getter
public class UserDto {

    private final String username;

    private final String password;

    private final String name;

    private final String surname;

    private final Role role;

    private final PersonId personId;

    public UserDto() {
        this.username = "";
        this.password = "";
        this.name = "";
        this.surname = "";
        this.role = Role.ROLE_PATRON;
        this.personId = PersonId.of("");
    }

    public UserDto(String username, String password, String name, String surname, Role role, PersonId personId) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.role = role;
        this.personId = personId;
    }
}
