package mk.ukim.finki.emt.bookcatalog.domain.models;

import lombok.Getter;

import mk.ukim.finki.emt.sharedkernel.domain.base.AbstractEntity;
import mk.ukim.finki.emt.sharedkernel.domain.personaldata.PersonalData;

import javax.persistence.Entity;

@Entity
@Getter
public class Author extends AbstractEntity<AuthorId> {

    private PersonalData personalData;

    protected Author() {
        super(AuthorId.randomId(AuthorId.class));
    }

    public static Author build(PersonalData personalData) {
        Author author = new Author();
        author.personalData = personalData;
        return author;
    }
}
