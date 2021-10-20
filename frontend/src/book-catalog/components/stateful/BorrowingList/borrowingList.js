import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';
import BorrowingTerm from '../../stateless/BorrowingTerm/borrowingTerm';
import AccessDenied from "../../../../shared-kernel/components/stateless/PageNotFound/pageNotFound";
import HomeComponent from "../../../../shared-kernel/components/stateful/HomeComponent/HomeComponent";

class BorrowingList extends Component {

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
        const pageCount = Math.ceil(this.props.borrowings.length / this.state.size);
        const borrowings = this.getBorrowingsPage(offset, nextPageOffset);

        const user = JSON.parse(localStorage.getItem("user"));
        const isAdmin = user?.role === "ROLE_ADMIN";

        if (user) {
            return (
                <div className={"container mm-4 pt-5"}>
                    {isAdmin && <div className={"row"}>
                        <div className={"col-md-5"}>
                            <div className="form-group">
                                <label>Book</label>
                                <select id="bookList" name="bookList" className="form-control" onChange={this.handleBookChange}>
                                    <option selected value={"none"}> -- All books -- </option>
                                    {this.props.books.map((term) =>
                                        <option value={term.id.id}>{term.title}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>}
                    <div className={"row"}>
                        <div className={"table-responsive"}>
                            <table className={"table table-striped"}>
                                <thead>
                                <tr>
                                    <th scope={"col"}>Title</th>
                                    <th scope={"col"}>Username</th>
                                    <th scope={"col"}>Start date</th>
                                    <th scope={"col"}>End date</th>
                                    <th scope={"col"}>Price</th>
                                    <th scope={"col"}>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    borrowings
                                }
                                </tbody>
                            </table>
                        </div>
                        {!isAdmin && <div className="col mb-3">
                                        <div className="row">
                                            <div className="col-sm-12 col-md-12">
                                                Total: {HomeComponent.getPriceWithCurrency(this.props.total.currency, this.props.total.amount)}
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

    handleBookChange = (event) => {
        this.props.onSelectBook(event.target.value);
    }

    getBorrowingsPage = (offset, nextPageOffset) => {
        return this.props.borrowings.map((term) => {
            return (
                <BorrowingTerm term={term}
                               onReturn={this.props.onReturn}
                               onDelete={this.props.onDelete}/>
            );
        }).filter((borrowing, index) => {
            return index >= offset && index < nextPageOffset;
        })
    }
}

export default BorrowingList;