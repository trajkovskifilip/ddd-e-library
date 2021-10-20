import React from "react";
import {useHistory} from "react-router-dom";
import AccessDenied from "../../../../shared-kernel/components/stateless/PageNotFound/pageNotFound";

const AuthorEdit = (props) => {

    const history = useHistory();
    const [formData, updateFormData] = React.useState({
        name: "",
        surname: "",
        birthYear: 0
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const name = formData.name !== "" ? formData.name : props.author.personalData?.name;
        const surname = formData.surname !== "" ? formData.surname : props.author.personalData?.surname;
        const birthYear = formData.birthYear !== 0 ? formData.birthYear : props.author.personalData?.birthYear;

        props.onEditAuthor(props.author.id.id, name, surname, birthYear);
        history.push("/authors");
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
                                <label>Name</label>
                                <input type="text"
                                       className="form-control"
                                       id="name"
                                       name="name"
                                       placeholder={props.author.personalData?.name}
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Surname</label>
                                <input type="text"
                                       className="form-control"
                                       id="surname"
                                       name="surname"
                                       placeholder={props.author.personalData?.surname}
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Birth Year</label>
                                <input type="number"
                                       className="form-control"
                                       id="birthYear"
                                       name="birthYear"
                                       placeholder={props.author.personalData?.birthYear}
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

export default AuthorEdit;