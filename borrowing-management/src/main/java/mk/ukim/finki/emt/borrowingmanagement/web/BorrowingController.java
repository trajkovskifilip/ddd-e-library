package mk.ukim.finki.emt.borrowingmanagement.web;

import lombok.AllArgsConstructor;
import mk.ukim.finki.emt.borrowingmanagement.domain.models.Borrowing;
import mk.ukim.finki.emt.borrowingmanagement.service.BorrowingService;
import mk.ukim.finki.emt.borrowingmanagement.service.forms.BorrowingForm;
import mk.ukim.finki.emt.sharedkernel.domain.financial.Money;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/borrowings")
@AllArgsConstructor
public class BorrowingController {

    private final BorrowingService borrowingService;

    @GetMapping
    public List<Borrowing> findAllBorrowings() {
        return this.borrowingService.findAllBorrowings();
    }

    @GetMapping("/borrowing/{id}")
    public Borrowing findBorrowingById(@PathVariable String id) {
        return this.borrowingService.findBorrowingById(id);
    }

    @GetMapping("/person/{id}")
    public List<Borrowing> findAllBorrowingsByPersonId(@PathVariable String id) {
        return this.borrowingService.findAllBorrowingsByPersonId(id);
    }

    @GetMapping("/book/{id}")
    public List<Borrowing> findAllBorrowingsByBookId(@PathVariable String id) {
        return this.borrowingService.findAllBorrowingsByBookId(id);
    }

    @PostMapping("/borrow-book")
    public void borrowBook(@RequestBody BorrowingForm borrowingForm) {
        this.borrowingService.borrowBook(borrowingForm);
    }

    @PutMapping("/return-book/{borrowingId}")
    public void returnBook(@PathVariable String borrowingId) {
        this.borrowingService.returnBook(borrowingId);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBorrowingById(@PathVariable String id) {
        this.borrowingService.deletePaidBorrowing(id);
    }

    @GetMapping("/total/{id}")
    public Money calculateTotalSumForPerson(@PathVariable String id) {
        return this.borrowingService.calculateTotalSumForPerson(id);
    }
}
