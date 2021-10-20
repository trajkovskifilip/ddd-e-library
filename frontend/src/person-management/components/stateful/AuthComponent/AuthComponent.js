import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import LoginComponent from "../LoginComponent/LoginComponent";
import LogoutComponent from "../LogoutComponent/LogoutComponent";
import Register from "../../stateless/Register/register";
import PersonService from "../../../repository/personRepository";

class AuthComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginException: "",
            user: {}
        }
    }

    render() {
        return (
            <Switch>
                <Route path={"/login"}>
                    <LoginComponent/>
                </Route>
                <Route path={"/logout"}>
                    <LogoutComponent/>
                </Route>
                <Route path={"/register"}>
                    <Register onRegister={this.register}/>
                </Route>
            </Switch>
        );
    }

    register = (username, password, repeatPassword, name, surname, birthYear, streetName, streetNumber, city, postcode, email, phoneNumber) => {
        PersonService.register(username, password, repeatPassword, name, surname, birthYear, streetName, streetNumber, city, postcode, email, phoneNumber).then(() => {
        });
    }
}

export default AuthComponent;