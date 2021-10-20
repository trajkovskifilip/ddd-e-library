package mk.ukim.finki.emt.personmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@ComponentScan(basePackages = {"mk.ukim.finki.emt.personmanagement", "mk.ukim.finki.emt.sharedkernel"})
@EntityScan(basePackages = {"mk.ukim.finki.emt.personmanagement", "mk.ukim.finki.emt.sharedkernel"})
@EnableJpaRepositories(basePackages = {"mk.ukim.finki.emt.personmanagement", "mk.ukim.finki.emt.sharedkernel"})
public class PersonManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(PersonManagementApplication.class, args);
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(10);
	}
}
