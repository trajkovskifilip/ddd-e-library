import React, {Component} from "react";
import PersonService from "../../../repository/personRepository";
import {Route, Switch} from "react-router-dom";
import PersonEdit from "../../stateless/PersonEdit/personEdit";
import PersonList from "../PersonList/PersonList";

class PersonComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            persons: [],
            selectedPerson: {}
        }
    }

    render() {
        return (
            <Switch>
                <Route path={"/persons/edit/:id"}>
                    <PersonEdit onEditPerson={this.editPerson}
                                person={this.state.selectedPerson}/>
                </Route>
                <Route path={"/persons"}>
                    <PersonList persons={this.state.persons}
                                onEdit={this.getPerson}
                                onDelete={this.deletePerson}/>
                </Route>
            </Switch>
        );
    }

    loadPersons = () => {
        PersonService.fetchPersons()
            .then((data) => {
                this.setState({
                    persons: data.data
                })
            });
    }

    getPerson = (id) => {
        PersonService.getPerson(id)
            .then((data) => {
                this.setState({
                    selectedPerson: data.data
                })
            });
    }

    editPerson = (id, address, contactInformation) => {
        PersonService.editPerson(id, address, contactInformation)
            .then(() => {
                this.loadPersons();
            });
    }

    deletePerson = (id) => {
        PersonService.deletePerson(id)
            .then(() => {
                this.loadPersons();
            });
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            this.loadPersons();
        }
    }
}

export default PersonComponent;