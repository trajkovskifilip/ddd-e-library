import React, {Component} from "react";
import BookService from "../../../repository/bookRepository";
import {Route, Switch} from "react-router-dom";
import BookList from "../BookList/bookList";
import BookAdd from "../../stateless/BookAdd/bookAdd";
import BookEdit from "../../stateless/BookEdit/bookEdit";
import AuthorList from "../AuthorList/authorList";
import AuthorAdd from "../../stateless/AuthorAdd/authorAdd";
import AuthorEdit from "../../stateless/AuthorEdit/authorEdit";
import BorrowingList from "../BorrowingList/borrowingList";

class BookComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            genres: [],
            authors: [],
            selectedBook: {},
            selectedAuthor: {},
            borrowings: [],
            total: {}
        }
    }

    render() {
        return (
            <Switch>
                <Route path={"/books/add-form"}>
                    <BookAdd genres={this.state.genres}
                             authors={this.state.authors}
                             onAddBook={this.addBook}/>
                </Route>
                <Route path={"/books/edit/:id"}>
                    <BookEdit onEditBook={this.editBook}
                              book={this.state.selectedBook}
                              genres={this.state.genres}
                              authors={this.state.authors}/>
                </Route>
                <Route path={"/books"}>
                    <BookList onEdit={this.getBook}
                              onBorrow={this.borrowBook}
                              onSelectAuthor={this.loadBooksByAuthor}
                              onSelectGenre={this.loadBooksByGenre}
                              books={this.state.books}
                              authors={this.state.authors}
                              genres={this.state.genres}
                    />
                </Route>
                <Route path={"/authors/add-form"}>
                    <AuthorAdd onAddAuthor={this.addAuthor}/>
                </Route>
                <Route path={"/authors/edit/:id"}>
                    <AuthorEdit onEditAuthor={this.editAuthor}
                                author={this.state.selectedAuthor}/>
                </Route>
                <Route path={"/authors"}>
                    <AuthorList authors={this.state.authors}
                                onEdit={this.getAuthor}/>
                </Route>
                <Route path={"/borrowings"}>
                    <BorrowingList borrowings={this.state.borrowings}
                                   books={this.state.books}
                                   total={this.state.total}
                                   onSelectBook={this.loadBorrowingsByBook}
                                   onDelete={this.deleteBorrowing}
                                   onReturn={this.returnBook}/>
                </Route>
            </Switch>
        );
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem("user"));
        const isAdmin = user?.role === "ROLE_ADMIN";

        if (user) {
            this.loadAuthors();
            this.loadGenres();
            this.loadBooks();
            if (isAdmin) {
                this.loadBorrowings();
            }
            else {
                this.loadBorrowingsByPerson(user.personId.id);
            }
            this.calculateTotal(user.personId.id);
        }
    }

    loadBooks = () => {
        BookService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            });
    }

    addBook = (isbn, title, authorId, genre, description, publishingYear, numberOfPages, numberOfCopies, numberOfAvailableCopies, price) => {
        BookService.addBook(isbn, title, authorId, genre, description, publishingYear, numberOfPages, numberOfCopies, numberOfAvailableCopies, price)
            .then(() => {
                this.loadBooks();
            });
    }

    editBook = (id, isbn, title, authorId, genre, description, publishingYear, numberOfPages, numberOfNewCopies, price) => {
        BookService.editBook(id, isbn, title, authorId, genre, description, publishingYear, numberOfPages, numberOfNewCopies, price)
            .then(() => {
                this.loadBooks();
            });
    }

    getBook = (id) => {
        BookService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            });
    }

    loadAuthors = () => {
        BookService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            });
    }

    getAuthor = (id) => {
        BookService.getAuthor(id)
            .then((data) => {
                this.setState({
                    selectedAuthor: data.data
                })
            });
    }

    addAuthor = (personalData) => {
        BookService.addAuthor(personalData)
            .then(() => {
                this.loadAuthors();
            })
    }

    editAuthor = (id, name, surname, birthYear) => {
        BookService.editAuthor(id, name, surname, birthYear)
            .then(() => {
                this.loadAuthors();
            })
    }

    loadGenres = () => {
        BookService.fetchGenres()
            .then((data) => {
                this.setState({
                    genres: data.data
                })
            });
    }

    loadBooksByGenre = (genre) => {
        if (genre === "none") {
            this.loadBooks();
        }
        else {
            BookService.getBooksByGenre(genre)
                .then((data) => {
                    this.setState({
                        books: data.data
                    })
                });
        }
    }

    loadBooksByAuthor = (authorId) => {
        if (authorId === "none") {
            this.loadBooks();
        }
        else {
            BookService.getBooksByAuthor(authorId)
                .then((data) => {
                    this.setState({
                        books: data.data
                    })
                });
        }
    }

    borrowBook = (book, person) => {
        BookService.borrowBook(book, person)
            .then((data) => {
                this.loadBooks();
            });
        window.location = "/borrowings";
    }

    loadBorrowings = () => {
        BookService.fetchAllBorrowings()
            .then((data) => {
                this.setState({
                    borrowings: data.data
                })
            });
    }

    loadBorrowingsByPerson = (personId) => {
        BookService.fetchBorrowingsByPerson(personId)
            .then((data) => {
                this.setState({
                    borrowings: data.data
                })
            });
    }

    loadBorrowingsByBook = (bookId) => {
        BookService.fetchBorrowingsByBook(bookId)
            .then((data) => {
                this.setState({
                    borrowings: data.data
                })
            });
    }

    returnBook = (borrowingId) => {
        BookService.returnBook(borrowingId)
            .then(() => {
                this.loadBorrowings();
            });
    }

    deleteBorrowing = (id) => {
        BookService.deleteBorrowing(id)
            .then(() => {
                this.loadBorrowings();
            });
    }

    calculateTotal = (personId) => {
        BookService.calculateTotal(personId)
            .then((data) => {
                this.setState({
                    total: data.data
                })
            });
    }
}

export default BookComponent;