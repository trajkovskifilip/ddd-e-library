package mk.ukim.finki.emt.personmanagement.domain.repository;

import mk.ukim.finki.emt.personmanagement.domain.models.Person;
import mk.ukim.finki.emt.personmanagement.domain.models.PersonId;
import mk.ukim.finki.emt.personmanagement.domain.models.User;
import mk.ukim.finki.emt.personmanagement.domain.valueobjects.Address;
import mk.ukim.finki.emt.personmanagement.domain.valueobjects.ContactInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends JpaRepository<Person, PersonId> {

    Person findPersonByUser(User user);

    @Modifying
    @Query("UPDATE Person p SET p.address = :address, p.contactInformation = :contactInformation WHERE p.id = :id")
    void updateAddressAndContactInformation(@Param("id") PersonId id,
                                            @Param("address") Address address,
                                            @Param("contactInformation") ContactInformation contactInformation);
}
