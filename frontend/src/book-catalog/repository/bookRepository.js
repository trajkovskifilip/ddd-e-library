import axios from '../custom-axios/axios';

const BASE_URL = "/borrowings";

const BookService = {

    fetchAuthors: () => {
        return axios.bookInstance.get("/authors");
    },

    getAuthor: (id) => {
        return axios.bookInstance.get(`/authors/${id}`);
    },

    addAuthor: (personalData) => {
        return axios.bookInstance.post("/authors/add", {
            "personalData": personalData
        });
    },

    editAuthor: (id, name, surname, birthYear) => {
        return axios.bookInstance.put(`authors/edit/${id}`, {
            "personalData": {
                "name": name,
                "surname": surname,
                "birthYear": birthYear
            }
        });
    },

    fetchBooks: () => {
        return axios.bookInstance.get("/books");
    },

    getBook: (id) => {
        return axios.bookInstance.get(`/books/${id}`);
    },

    addBook: (isbn, title, authorId, genre, description, publishingYear, numberOfPages, numberOfCopies, numberOfAvailableCopies, price) => {
        return axios.bookInstance.post("/books/add", {
            "isbn": isbn,
            "title": title,
            "authorId": authorId,
            "genre": genre,
            "description": description,
            "publishingYear": publishingYear,
            "numberOfPages": numberOfPages,
            "numberOfCopies": numberOfCopies,
            "numberOfAvailableCopies": numberOfAvailableCopies,
            "price": price
        });
    },

    editBook: (id, isbn, title, authorId, genre, description, publishingYear, numberOfPages, numberOfNewCopies, price) => {
        return axios.bookInstance.put(`books/edit/${id}`, {
            "isbn": isbn,
            "title": title,
            "authorId": authorId,
            "genre": genre,
            "description": description,
            "publishingYear": publishingYear,
            "numberOfPages": numberOfPages,
            "numberOfNewCopies": numberOfNewCopies,
            "price": price
        });
    },

    fetchGenres: () => {
        return axios.bookInstance.get("/books/genres");
    },

    getBooksByGenre: (genre) => {
        return axios.bookInstance.get(`/books/genres/${genre}`);
    },

    getBooksByAuthor: (authorId) => {
        return axios.bookInstance.get(`/books/author/${authorId}`);
    },

    fetchAllBorrowings: () => {
        return axios.borrowingInstance.get(BASE_URL);
    },

    getBorrowing: (id) => {
        return axios.borrowingInstance.get(`${BASE_URL}/borrowing/${id}`);
    },

    fetchBorrowingsByPerson: (id) => {
        return axios.borrowingInstance.get(`${BASE_URL}/person/${id}`);
    },

    fetchBorrowingsByBook: (id) => {
        return axios.borrowingInstance.get(`${BASE_URL}/book/${id}`);
    },

    borrowBook: (book, person) => {
        return axios.borrowingInstance.post(`${BASE_URL}/borrow-book`, {
            "book": {
                "id": book.id,
                "title": book.title,
                "price": book.price
            },
            "person": {
                "id": person.personId,
                "name": person.name,
                "surname": person.surname,
                "username": person.username
            }
        });
    },

    returnBook: (id) => {
        return axios.borrowingInstance.put(`${BASE_URL}/return-book/${id}`);
    },

    deleteBorrowing: (id) => {
        return axios.borrowingInstance.delete(`${BASE_URL}/delete/${id}`);
    },

    calculateTotal: (id) => {
        return axios.borrowingInstance.get(`${BASE_URL}/total/${id}`);
    }
}

export default BookService;