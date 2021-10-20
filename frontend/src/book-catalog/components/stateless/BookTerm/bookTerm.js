import React, {useRef} from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import HomeComponent from "../../../../shared-kernel/components/stateful/HomeComponent/HomeComponent";

const bookTerm = (props) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.role === "ROLE_ADMIN";

    return (
        <tr key={props.term.id.id}>
            <td>{props.term.isbn.isbn}</td>
            <td>{props.term.title}</td>
            <td>{props.term.author.personalData.name} {props.term.author.personalData.surname}</td>
            <td>{props.term.genre}</td>
            <td>{props.term.description}</td>
            <td>{props.term.publishingYear}</td>
            <td>{props.term.numberOfPages}</td>
            <td>{props.term.numberOfCopies}</td>
            <td>{props.term.numberOfAvailableCopies}</td>
            <td>{HomeComponent.getPriceWithCurrency(props.term.price.currency, props.term.price.amount)}</td>
            <td>
                {user && !isAdmin && <button className={"btn btn-warning mt-2"}
                                             disabled={(props.term.numberOfAvailableCopies === 0)}
                                             onClick={() => props.onBorrow(props.term, user)}>
                                        <FontAwesomeIcon icon={"shopping-cart"}/>Borrow</button>}
                {user && isAdmin && <Link className={"btn btn-info"}
                                          onClick={() => props.onEdit(props.term.id.id)}
                                          to={`/books/edit/${props.term.id.id}`}>Edit</Link>}
            </td>
        </tr>
    );
}

export default bookTerm;