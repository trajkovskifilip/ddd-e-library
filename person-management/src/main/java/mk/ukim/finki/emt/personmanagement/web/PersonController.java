package mk.ukim.finki.emt.personmanagement.web;

import lombok.AllArgsConstructor;
import mk.ukim.finki.emt.personmanagement.domain.models.Person;
import mk.ukim.finki.emt.personmanagement.domain.models.dto.UserDto;
import mk.ukim.finki.emt.personmanagement.service.PersonService;
import mk.ukim.finki.emt.personmanagement.service.forms.LoginForm;
import mk.ukim.finki.emt.personmanagement.service.forms.PersonEditForm;
import mk.ukim.finki.emt.personmanagement.service.forms.RegisterForm;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/persons")
@AllArgsConstructor
public class PersonController {

    private final PersonService personService;

    @GetMapping
    public List<Person> findAll() {
        return this.personService.findAll();
    }

    @GetMapping("/{id}")
    public Person findById(@PathVariable String id) {
        return this.personService.findById(id);
    }

    @PutMapping("/edit/{id}")
    public void edit(@PathVariable String id, @RequestBody PersonEditForm personEditForm) {
        this.personService.update(id, personEditForm);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable String id) {
        this.personService.delete(id);
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginForm loginForm) {
        UserDto userDto;
        try {
            userDto = this.personService.login(loginForm);
            return ResponseEntity.ok().body(userDto);
        } catch (Exception ex) {
            return ResponseEntity.ok().body(ex.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterForm registerForm) {
        try {
            this.personService.register(registerForm);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }
}
