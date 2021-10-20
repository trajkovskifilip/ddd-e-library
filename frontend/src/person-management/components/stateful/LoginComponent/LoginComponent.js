import React, {Component} from 'react';
import './LoginComponent.css';
import PersonService from "../../../repository/personRepository";

class LoginComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
            loginException: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value.trim()
        })
    }

    loginClicked = (e) => {
        e.preventDefault();
        const username = this.state.username;
        const password = this.state.password;

        if (this.isFormValid()) {
            PersonService.login(username, password).then((data) => {
                if (!data.data.name) {
                    this.setState({
                        loginException: data.data,
                    });
                    window.location = "/login";
                } else {
                    localStorage.setItem("user", JSON.stringify(data.data));
                    window.location = "/home";
                }
            });
        }
    }

    isFormValid = () => {
        return this.state.username !== "" && this.state.password !== "";
    }

    render() {
        return (
            <div>
                <div className={"container"}>
                    <div className="row pt-5 d-flex">
                        <div className={"col-md-4"}/>
                        <div className="col-md-4 card p-4 mt-100">
                            <h3 className={"text-center mb-4"}>Login Form</h3>
                            <form onSubmit={this.loginClicked}>
                                <div className="form-group mb-3">
                                    <label htmlFor="username">Username</label>
                                    <input type="text"
                                           className="form-control"
                                           id="username"
                                           name="username"
                                           placeholder="Enter username"
                                           required
                                           onChange={this.handleChange}
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
                                           onChange={this.handleChange}
                                    />
                                </div>
                                <button id="submit" type="submit"
                                        disabled={!this.isFormValid()}
                                        className="btn w-100 btn-primary mt-4">Login
                                </button>
                            </form>
                            <div className={"text-danger"}>
                                {this.state.loginException}
                            </div>
                        </div>
                        <div className={"col-md-4"}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginComponent;