import React from 'react';
import HomeComponent from "../../../../shared-kernel/components/stateful/HomeComponent/HomeComponent";

const borrowingTerm = (props) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.role === "ROLE_ADMIN";

    return (
        <tr key={props.term.id.id}>
            <td>{props.term.title}</td>
            <td>{props.term.username}</td>
            <td>{props.term.startDate}</td>
            <td>{props.term?.endDate}</td>
            <td>{HomeComponent.getPriceWithCurrency(props.term.borrowingPrice.currency, props.term.borrowingPrice.amount)}</td>
            <td>
                {user && !isAdmin && <button className={"btn btn-info"}
                                             disabled={(props.term?.endDate !== null)}
                                             onClick={() => props.onReturn(props.term.id.id)}>Return book</button>}
                {user && isAdmin && <button className={"btn btn-danger"}
                                            disabled={(props.term?.endDate === null)}
                                            onClick={() => props.onDelete(props.term.id.id)}>Delete</button>}
            </td>
        </tr>
    );
}

export default borrowingTerm;