import React, {Component} from 'react';

class LogoutComponent extends Component {

    componentDidMount() {
        localStorage.clear();
        window.location = "/home";
    }

    render() {
        return (
            <div>Logging out...</div>
        );
    }
}

export default LogoutComponent;