import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';
import {Link} from "react-router-dom";
import AuthorTerm from '../../stateless/AuthorTerm/authorTerm';
import AccessDenied from "../../../../shared-kernel/components/stateless/PageNotFound/pageNotFound";

class AuthorList extends Component {

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
        const pageCount = Math.ceil(this.props.authors.length / this.state.size);
        const authors = this.getAuthorsPage(offset, nextPageOffset);

        const user = JSON.parse(localStorage.getItem("user"));
        const isAdmin = user?.role === "ROLE_ADMIN";

        if (user && isAdmin) {
            return (
                <div className={"container mm-4 pt-5"}>
                    <div className={"row"}>
                        <div className={"table-responsive"}>
                            <table className={"table table-striped"}>
                                <thead>
                                <tr>
                                    <th scope={"col"}>Name</th>
                                    <th scope={"col"}>Surname</th>
                                    <th scope={"col"}>Birth year</th>
                                    <th scope={"col"}>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    authors
                                }
                                </tbody>
                            </table>
                        </div>
                        <div className="col mb-3">
                            <div className="row">
                                <div className="col-sm-12 col-md-12">
                                    <Link className={"btn btn-block btn-dark"} to={"/authors/add-form"}>Add new author</Link>
                                </div>
                            </div>
                        </div>
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
        } else {
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

    getAuthorsPage = (offset, nextPageOffset) => {
        return this.props.authors.map((term) => {
            return (
                <AuthorTerm term={term}
                          onEdit={this.props.onEdit}/>
            );
        }).filter((author, index) => {
            return index >= offset && index < nextPageOffset;
        })
    }
}

export default AuthorList;