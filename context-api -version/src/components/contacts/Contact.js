import React, { Component } from "react";
import { Link } from "react-router-dom"
import { Consumer } from "../../context";
import axios from "axios";

export default class Contact extends Component {
  state = {
    showContactInfo: false
  }

  onShowClick = e => {
    this.setState({ showContactInfo: !this.state.showContactInfo })

  };

  onDeleteClick = async (id, dispatch) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)

    dispatch({ type: "DELETE_CONTACT", payload: id });
  }

  render() {
    const { id, name, email, phone } = this.props;
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}
                <i onClick={this.onShowClick} className="fas fa-sort-down ml-2" style={{ cursor: "pointer" }} />
                <button onClick={this.onDeleteClick.bind(this, id, dispatch)} type="button" className="close text-danger" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <Link to={`/contact/edit/${id}`}>
                  <i className="fas fa-pencil-alt float-right text-dark mr-1"></i>
                </Link>

              </h4>

              {showContactInfo ?
                (<ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>)
                : null}

            </div>
          )
        }}
      </Consumer>
    );
  }
}
