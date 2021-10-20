package mk.ukim.finki.emt.personmanagement.domain.models;

import lombok.Getter;
import mk.ukim.finki.emt.personmanagement.domain.enums.Role;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "users")
public class User {

    @Id
    private String username;

    private String password;

    private String name;

    private String surname;

    @Enumerated(value = EnumType.STRING)
    private Role role;

    public User() {

    }

    public User(String username, String password, String name, String surname, Role role) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.role = role;
    }

    public static User build(String username, String password, String name, String surname, Role role) {
        User user = new User();
        user.username = username;
        user.password = password;
        user.name = name;
        user.surname = surname;
        user.role = role;
        return user;
    }
}
