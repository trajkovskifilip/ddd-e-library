import './HomeComponent.css';
import React, {Component} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const user = JSON.parse(localStorage.getItem("user"));

        return (
            <div className={"home-content"}>
                <div className="left" style={user ? null : {pointerEvents: "none", opacity: "30%"}}>
                    <a href={"/books"}
                       className="d-inline-block big primary-color justify-content-center align-items-center f-font">
                        <div className={"text-center small pt-4"}>Book catalog</div>
                    </a>
                </div>
                <div className="right" style={user ? null : {pointerEvents: "none", opacity: "30%"}}>
                    <a href={"/borrowings"}
                       className="d-inline-block big primary-color justify-content-center align-items-center f-font">
                        <div className={"text-center small pt-4"}>Borrowings</div>
                    </a>
                </div>
                <div className="middle">
                    <a href={"/register"}
                       className="d-inline-block big primary-color justify-content-center align-items-center f-font">
                        <div className={"text-center small pt-4"}>Register</div>
                        <div className={"text-center"}>
                            <FontAwesomeIcon icon="user" className={"w-50 h-50 mt-4 user-icon"}/>
                        </div>
                    </a>
                </div>
            </div>
        );
    }

    static getPriceWithCurrency(currencyEnum, price) {
        switch (currencyEnum) {
            case "USD":
                return "$" + price
            case "EUR":
                return "€" + price
            case "MKD":
                return price + " ден."
            default:
                return "Wrong format"
        }
    }
}

export default HomeComponent;