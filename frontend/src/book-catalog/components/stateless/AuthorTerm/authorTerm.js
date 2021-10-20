import React from 'react';
import {Link} from "react-router-dom";

const authorTerm = (props) => {
    return (
        <tr key={props.term.id.id}>
            <td>{props.term.personalData.name}</td>
            <td>{props.term.personalData.surname}</td>
            <td>{props.term.personalData.birthYear}</td>
            <td>
                <Link className={"btn btn-info"}
                      onClick={() => props.onEdit(props.term.id.id)}
                      to={`/authors/edit/${props.term.id.id}`}>Edit</Link>
            </td>
        </tr>

    );
}

export default authorTerm;