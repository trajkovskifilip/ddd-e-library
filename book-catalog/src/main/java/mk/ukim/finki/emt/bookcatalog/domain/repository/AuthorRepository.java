package mk.ukim.finki.emt.bookcatalog.domain.repository;

import mk.ukim.finki.emt.bookcatalog.domain.models.Author;
import mk.ukim.finki.emt.bookcatalog.domain.models.AuthorId;
import mk.ukim.finki.emt.sharedkernel.domain.personaldata.PersonalData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<Author, AuthorId> {

    @Modifying
    @Query("UPDATE Author a SET a.personalData = :personalData WHERE a.id = :id")
    void updateAuthor(@Param("id") AuthorId id,
                      @Param("personalData") PersonalData personalData);
}
