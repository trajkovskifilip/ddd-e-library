import React from 'react';
import {Link} from "react-router-dom";
import "./personTerm.css";

const personTerm = (props) => {
    return (
        <tr key={props.term.id.id}>
            <td>{props.term.personalData.name}</td>
            <td>{props.term.personalData.surname}</td>
            <td>{props.term.personalData.birthYear}</td>
            <td>{props.term.address.streetName}</td>
            <td>{props.term.address.streetNumber}</td>
            <td>{props.term.address.city}</td>
            <td>{props.term.address.postcode}</td>
            <td>{props.term.contactInformation.email}</td>
            <td>{props.term.contactInformation.phoneNumber}</td>
            <td className={"text-right"}>
                <Link className={"btn btn-info"}
                      onClick={() => props.onEdit(props.term.id.id)}
                      to={`/persons/edit/${props.term.id.id}`}>Edit</Link>
                <Link className={"btn btn-danger action-button"}
                      onClick={() => props.onDelete(props.term.id.id)}>Delete</Link>
            </td>
        </tr>

    );
}

export default personTerm;