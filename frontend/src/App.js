import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import React from "react";
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {
  faMinusCircle,
  faPlusCircle,
  faShoppingCart,
  faTrashAlt,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import Header from "./shared-kernel/components/stateless/Header/header";
import HomeComponent from "./shared-kernel/components/stateful/HomeComponent/HomeComponent";
import PersonComponent from "./person-management/components/stateful/PersonComponent/PersonComponent";
import AuthComponent from "./person-management/components/stateful/AuthComponent/AuthComponent";
import BookComponent from "./book-catalog/components/stateful/BookComponent/bookComponent";

library.add(fab, faUser, faShoppingCart, faPlusCircle, faMinusCircle, faTrashAlt)

function App() {
  return (
      <Router>
        <Header/>
        <main>
          <Switch>
            <Route path={"/books"}>
              <BookComponent/>
            </Route>
            <Route path={"/authors"}>
              <BookComponent/>
            </Route>
            <Route path={"/borrowings"}>
              <BookComponent/>
            </Route>
            <Route path={"/persons"}>
              <PersonComponent/>
            </Route>
            <Route path={"/login"}>
              <AuthComponent/>
            </Route>
            <Route path={"/logout"}>
              <AuthComponent/>
            </Route>
            <Route path={"/register"}>
              <AuthComponent/>
            </Route>
            <Route path={"/home"}>
              <HomeComponent/>
            </Route>
            <Route path={"/"}>
              <Redirect to={"/home"}/>
            </Route>
          </Switch>
        </main>
      </Router>
  );
}

export default App;
