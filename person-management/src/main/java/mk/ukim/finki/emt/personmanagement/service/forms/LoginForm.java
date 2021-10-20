package mk.ukim.finki.emt.personmanagement.service.forms;

import lombok.Getter;
import javax.validation.constraints.NotNull;

@Getter
public class LoginForm {

    @NotNull
    private String username;

    @NotNull
    private String password;
}
