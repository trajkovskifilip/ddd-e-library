import React from 'react';
import {useHistory} from "react-router-dom";
import "./register.css";

const Register = (props) => {

    const history = useHistory();
    const [formData, updateFormData] = React.useState({
        username: "",
        password: "",
        repeatPassword: "",
        name: "",
        surname: "",
        birthYear: 2000,
        streetName: "",
        streetNumber: "",
        city: "",
        postcode: "",
        email: "",
        phoneNumber: ""
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const username = formData.username;
        const password = formData.password;
        const repeatPassword = formData.repeatPassword;
        const name = formData.name;
        const surname = formData.surname;
        const birthYear = formData.birthYear;
        const streetName = formData.streetName;
        const streetNumber = formData.streetNumber;
        const city = formData.city;
        const postcode = formData.postcode;
        const email = formData.email;
        const phoneNumber = formData.phoneNumber;

        if (isFormValid()) {
            props.onRegister(username, password, repeatPassword, name, surname, birthYear, streetName, streetNumber, city, postcode, email, phoneNumber);
            history.push("/login");
        }
    }

    const isFormValid = () => {
        let isValid = true;
        for (let attr in formData) {
            if (formData[attr] === "") {
                isValid = false;
            }
        }
        return isValid;
    }
    return (
        <div className={"container"}>
            <div className="row pt-5">
                <div className={"col-md-2"}/>
                <div className="col-md-8 card p-4">
                    <h3 className={"text-center mb-4"}>Register Form</h3>
                    <form className={"d-block register-form"} onSubmit={onFormSubmit}>
                        <div className={"row"}>
                            <div className={"col-md-6"}>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text"
                                           className="form-control"
                                           id="username"
                                           name="username"
                                           placeholder="Enter username"
                                           required
                                           onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password"
                                           className="form-control"
                                           id="password"
                                           name="password"
                                           placeholder="Enter password"
                                           required
                                           onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="repeatPassword">Repeat password</label>
                                    <input type="password"
                                           className="form-control"
                                           id="repeatPassword"
                                           name="repeatPassword"
                                           placeholder="Repeat password"
                                           required
                                           onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className={"col-md-6"}>
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
                                <div className="form-group">
                                    <label htmlFor="streetName">Street Name</label>
                                    <input type="text"
                                           className="form-control"
                                           id="streetName"
                                           name="streetName"
                                           placeholder="Enter street name"
                                           required
                                           onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="streetNumber">Street Number</label>
                                    <input type="text"
                                           className="form-control"
                                           id="streetNumber"
                                           name="streetNumber"
                                           placeholder="Enter street number"
                                           required
                                           onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="city">City</label>
                                    <input type="text"
                                           className="form-control"
                                           id="city"
                                           name="city"
                                           placeholder="Enter city"
                                           required
                                           onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="postcode">Postcode</label>
                                    <input type="text"
                                           className="form-control"
                                           id="postcode"
                                           name="postcode"
                                           placeholder="Enter postcode"
                                           required
                                           onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="text"
                                           className="form-control"
                                           id="email"
                                           name="email"
                                           placeholder="Enter email"
                                           required
                                           onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input type="text"
                                           className="form-control"
                                           id="phoneNumber"
                                           name="phoneNumber"
                                           placeholder="Enter phone number"
                                           required
                                           onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <button id="submit" type="submit"
                                disabled={!isFormValid()}
                                className="btn btn-primary w-100 mt-3 mb-3">Register
                        </button>
                    </form>
                </div>
                <div className={"col-md-2"}/>
            </div>
        </div>
    );
}

export default Register;