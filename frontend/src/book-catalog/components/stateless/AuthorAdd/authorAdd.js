import React from "react";
import {useHistory} from "react-router-dom";
import AccessDenied from "../../../../shared-kernel/components/stateless/PageNotFound/pageNotFound";

const AuthorAdd = (props) => {

    const history = useHistory();
    const [formData, updateFormData] = React.useState({
        personalData: {
            "name": "",
            "surname": "",
            "birthYear": 2000
        }
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const personalData = {
            "name": formData.name,
            "surname": formData.surname,
            "birthYear": formData.birthYear
        };

        if (isFormValid()) {
            props.onAddAuthor(personalData);
            history.push("/authors");
        }
    }

    const isFormValid = () => {
        let isValid = true;
        for (let attr in formData) {
            if (formData[attr] === "" || formData[attr] === 0) {
                isValid = false;
            }
        }
        return isValid;
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
                                <label htmlFor="name">Name</label>
                                <input type="text"
                                       className="form-control"
                                       id="name"
                                       name="name"
                                       placeholder="Enter name"
                                       required
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="surname">Surname</label>
                                <input type="text"
                                       className="form-control"
                                       id="surname"
                                       name="surname"
                                       placeholder="Enter surname"
                                       required
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="birthYear">Birth Year</label>
                                <input type="number"
                                       className="form-control"
                                       id="birthYear"
                                       name="birthYear"
                                       placeholder="Enter birth year"
                                       required
                                       onChange={handleChange}
                                />
                            </div>
                            <button id="submit" type="submit"
                                    disabled={!isFormValid()}
                                    className="btn btn-primary mt-3 mb-3">Submit
                            </button>
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

export default AuthorAdd;