import React from "react";
import {useHistory} from "react-router-dom";
import AccessDenied from "../../../../shared-kernel/components/stateless/PageNotFound/pageNotFound";

const BookEdit = (props) => {

    const history = useHistory();
    const [formData, updateFormData] = React.useState({
        isbn: "",
        title: "",
        authorId: "",
        genre: "",
        description: "",
        publishingYear: 0,
        numberOfPages: 0,
        numberOfNewCopies: 0,
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
            "isbn": formData.isbn !== "" ? formData.isbn : props.book.isbn.isbn
        }
        const title = formData.title !== "" ? formData.title : props.book.title;
        const authorId = formData.authorId !== "" ? formData.authorId : props.book.author.id.id;
        const genre = formData.genre !== "" ? formData.genre : props.book.genre;
        const description = formData.description !== "" ? formData.description : props.book.description;
        const publishingYear = formData.publishingYear !== 0 ? formData.publishingYear : props.book.publishingYear;
        const numberOfPages = formData.numberOfPages !== 0 ? formData.numberOfPages : props.book.numberOfPages;
        const numberOfNewCopies = formData.numberOfNewCopies;
        const price = {
            "amount": formData.price !== 0 ? formData.price : props.book.price.amount,
            "currency": props.book.price.currency
        };

        props.onEditBook(props.book.id.id, isbn, title, authorId, genre, description, publishingYear, numberOfPages, numberOfNewCopies, price);
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
                                <label>ISBN</label>
                                <input type="text"
                                       className="form-control"
                                       id="isbn"
                                       name="isbn"
                                       placeholder={props.book.isbn?.isbn}
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Book title</label>
                                <input type="text"
                                       className="form-control"
                                       id="title"
                                       name="title"
                                       placeholder={props.book?.title}
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Author</label>
                                <select name="authorId" className="form-control" onChange={handleChange}>
                                    {props.authors.map((term) => {
                                        if (props.book?.author !== undefined && props.book?.author === term)
                                            return <option selected={props.book?.author} value={term.id.id}>{term.personalData.name} {term.personalData.surname}</option>
                                        else
                                            return <option value={term.id.id}>{term.personalData.name} {term.personalData.surname}</option>
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Genre</label>
                                <select name="genre" className="form-control" onChange={handleChange}>
                                    {props.genres.map((term) => {
                                        if (props.book?.genre !== undefined && props.book?.genre === term)
                                            return <option selected={props.book?.genre} value={term}>{term}</option>
                                        else
                                            return <option value={term}>{term}</option>
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Short description</label>
                                <input type="text"
                                       className="form-control"
                                       id="description"
                                       name="description"
                                       placeholder={props.book?.description}
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Publishing Year</label>
                                <input type="number"
                                       className="form-control"
                                       id="publishingYear"
                                       name="publishingYear"
                                       placeholder={props.book?.publishingYear}
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>No. of pages</label>
                                <input type="number"
                                       className="form-control"
                                       id="numberOfPages"
                                       name="numberOfPages"
                                       placeholder={props.book?.numberOfPages}
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>No. of new copies</label>
                                <input type="number"
                                       className="form-control"
                                       id="numberOfNewCopies"
                                       name="numberOfNewCopies"
                                       placeholder="Enter no. of new copies"
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Price (in {props.book.price?.currency})</label>
                                <input type="number"
                                       className="form-control"
                                       id="price"
                                       name="price"
                                       placeholder={props.book.price?.amount}
                                       onChange={handleChange}
                                />
                            </div>
                            <button id="submit" type="submit" className="btn btn-primary mt-3 mb-3">Submit</button>
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

export default BookEdit;