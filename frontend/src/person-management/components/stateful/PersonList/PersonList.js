import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';
import PersonTerm from '../../stateless/PersonTerm/personTerm';
import AccessDenied from "../../../../shared-kernel/components/stateless/PageNotFound/pageNotFound";

class PersonList extends Component {

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
        const pageCount = Math.ceil(this.props.persons.length / this.state.size);
        const persons = this.getPersonsPage(offset, nextPageOffset);

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
                                    <th scope={"col"}>Birth Year</th>
                                    <th scope={"col"}>Street Name</th>
                                    <th scope={"col"}>Street Number</th>
                                    <th scope={"col"}>City</th>
                                    <th scope={"col"}>Postcode</th>
                                    <th scope={"col"}>Email</th>
                                    <th scope={"col"}>Phone Number</th>
                                    <th scope={"col"}>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    persons
                                }
                                </tbody>
                            </table>
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

    getPersonsPage = (offset, nextPageOffset) => {
        return this.props.persons.map((term) => {
            return (
                <PersonTerm term={term}
                            onEdit={this.props.onEdit}
                            onDelete={this.props.onDelete}/>
            );
        }).filter((person, index) => {
            return index >= offset && index < nextPageOffset;
        })
    }
}

export default PersonList;