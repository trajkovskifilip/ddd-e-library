import React from "react";
import {useHistory} from "react-router-dom";
import AccessDenied from "../../../../shared-kernel/components/stateless/PageNotFound/pageNotFound";

const BookAdd = (props) => {

    const history = useHistory();
    const [formData, updateFormData] = React.useState({
        isbn: "",
        title: "",
        authorId: 0,
        genre: "",
        description: "",
        publishingYear: 0,
        numberOfPages: 0,
        numberOfCopies: 0,
        numberOfAvailableCopies: 0,
        price: 0
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const isbn = {
            "isbn": formData.isbn
        }
        const title = formData.title;
        const authorId = formData.authorId;
        const genre = formData.genre;
        const description = formData.description;
        const publishingYear = formData.publishingYear;
        const numberOfPages = formData.numberOfPages;
        const numberOfCopies = formData.numberOfCopies;
        const numberOfAvailableCopies = formData.numberOfAvailableCopies;
        const price = {
            "amount": formData.price,
            "currency": "MKD"
        };

        props.onAddBook(isbn, title, authorId, genre, description, publishingYear, numberOfPages, numberOfCopies, numberOfAvailableCopies, price);
        history.push("/books");
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.role === "ROLE_ADMIN";

    if (user && isAdmin) {
        return (
            <div className={"container"}>
                <div className="row pt-5">
                    <div className="col-md-5">
                        <form onSubmit={onFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="isbn">ISBN</label>
                                <input type="text"
                                       className="form-control"
                                       id="isbn"
                                       name="isbn"
                                       required
                                       placeholder="Enter book ISBN"
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Book title</label>
                                <input type="text"
                                       className="form-control"
                                       id="title"
                                       name="title"
                                       required
                                       placeholder="Enter book title"
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Author</label>
                                <select name="authorId" className="form-control" onChange={handleChange}>
                                    {props.authors.map((term) =>
                                        <option value={term.id.id}>{term.personalData.name} {term.personalData.surname}</option>
                                    )}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Genre</label>
                                <select name="genre" className="form-control" onChange={handleChange}>
                                    {props.genres.map((term) =>
                                        <option value={term}>{term}</option>
                                    )}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Short description</label>
                                <input type="text"
                                       className="form-control"
                                       id="description"
                                       name="description"
                                       required
                                       placeholder="Enter short description"
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="publishingYear">Publishing Year</label>
                                <input type="number"
                                       className="form-control"
                                       id="publishingYear"
                                       name="publishingYear"
                                       placeholder="Enter publishing year"
                                       required
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="numberOfPages">No. of pages</label>
                                <input type="number"
                                       className="form-control"
                                       id="numberOfPages"
                                       name="numberOfPages"
                                       placeholder="Enter no. of pages"
                                       required
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="numberOfCopies">No. of copies</label>
                                <input type="number"
                                       className="form-control"
                                       id="numberOfCopies"
                                       name="numberOfCopies"
                                       placeholder="Enter no. of copies"
                                       required
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="numberOfAvailableCopies">No. of available copies</label>
                                <input type="number"
                                       className="form-control"
                                       id="numberOfAvailableCopies"
                                       name="numberOfAvailableCopies"
                                       placeholder="Enter no. of available copies"
                                       required
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <input type="number"
                                       className="form-control"
                                       id="price"
                                       name="price"
                                       placeholder="Enter price in MKD"
                                       required
                                       onChange={handleChange}
                                />
                            </div>
                            <button id="submit" type="submit"
                                    className="btn btn-primary mt-3 mb-3">Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <AccessDenied/>
        );
    }

}

export default BookAdd;