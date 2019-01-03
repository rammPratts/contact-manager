import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom"

import Contacts from "./components/contacts/Contacts";
import Navbar from "./components/layout/Navbar";
import AddContact from "./components/contacts/AddContact";
import About from "./components/pages/About";
import EditContact from "./components/contacts/EditContact";
import NotFound from "./components/pages/NotFound";

import { Provider } from "./context"

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/contact/add" component={AddContact} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact/edit/:id" component={EditContact} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
