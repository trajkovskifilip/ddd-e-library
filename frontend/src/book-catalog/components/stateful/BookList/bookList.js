import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';
import {Link} from "react-router-dom";
import BookTerm from '../../stateless/BookTerm/bookTerm';
import AccessDenied from "../../../../shared-kernel/components/stateless/PageNotFound/pageNotFound";

class BookList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            size: 5
        }
    }

    render() {
        const offset = this.state.size * this.state.page;
        const nextPageOffset = offset + this.state.size;
        const pageCount = Math.ceil(this.props.books.length / this.state.size);
        const books = this.getBooksPage(offset, nextPageOffset);

        const user = JSON.parse(localStorage.getItem("user"));
        const isAdmin = user?.role === "ROLE_ADMIN";

        if (user) {
            return (
                <div className={"container mm-4 pt-5"}>
                    <div className={"row"}>
                        <div className={"col-md-5"}>
                            <div className="form-group">
                                <label>Author</label>
                                <select id="authorList" name="authorId" className="form-control" onChange={this.handleAuthorChange}>
                                    <option selected value={"none"}> -- All authors -- </option>
                                    {this.props.authors.map((term) =>
                                        <option value={term.id.id}>{term.personalData.name} {term.personalData.surname}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className={"col-md-5"}>
                            <div className="form-group">
                                <label>Genre</label>
                                <select id="genreList" name="genre" className="form-control" onChange={this.handleGenreChange}>
                                    <option selected value={"none"}> -- All genres -- </option>
                                    {this.props.genres.map((term) =>
                                        <option value={term}>{term}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"table-responsive"}>
                            <table className={"table table-striped"}>
                                <thead>
                                <tr>
                                    <th scope={"col"}>ISBN</th>
                                    <th scope={"col"}>Title</th>
                                    <th scope={"col"}>Author</th>
                                    <th scope={"col"}>Genre</th>
                                    <th scope={"col"}>Description</th>
                                    <th scope={"col"}>Publishing Year</th>
                                    <th scope={"col"}>Number of pages</th>
                                    <th scope={"col"}>Number of copies</th>
                                    <th scope={"col"}>Number of available copies</th>
                                    <th scope={"col"}>Price</th>
                                    <th scope={"col"}>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    books
                                }
                                </tbody>
                            </table>
                        </div>
                        {isAdmin && <div className="col mb-3">
                            <div className="row">
                                <div className="col-sm-12 col-md-12">
                                    <Link className={"btn btn-block btn-dark"} to={"/books/add-form"}>Add new book</Link>
                                </div>
                            </div>
                        </div>}
                    </div>
                    <ReactPaginate previousLabel={"back"}
                                   nextLabel={"next"}
                                   breakLabel={<a href="/#">...</a>}
                                   breakClassName={"page-item"}
                                   breakLinkClassName={"page-link"}
                                   pageClassName={"page-item"}
                                   pageLinkClassName={"page-link"}
                                   previousClassName={"page-item"}
                                   previousLinkClassName={"page-link"}
                                   nextClassName={"page-item"}
                                   nextLinkClassName={"page-link"}
                                   pageCount={pageCount}
                                   marginPagesDisplayed={2}
                                   pageRangeDisplayed={5}
                                   onPageChange={this.handlePageClick}
                                   containerClassName={"pagination m-4 justify-content-center"}
                                   activeClassName={"active"}
                    />
                </div>
            );
        }
        else {
            return (
                <AccessDenied/>
            );
        }
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        this.setState({
            page: selected
        })
    }

    handleAuthorChange = (event) => {
        const genreList = document.getElementById('genreList');
        genreList.value = "none";
        this.props.onSelectAuthor(event.target.value);
    }

    handleGenreChange = (event) => {
        const authorList = document.getElementById('authorList');
        authorList.value = "none";
        this.props.onSelectGenre(event.target.value);
    }

    getBooksPage = (offset, nextPageOffset) => {
        return this.props.books.map((term) => {
            return (
                <BookTerm term={term}
                          onEdit={this.props.onEdit}
                          onBorrow={this.props.onBorrow}/>
            );
        }).filter((book, index) => {
            return index >= offset && index < nextPageOffset;
        })
    }
}

export default BookList;