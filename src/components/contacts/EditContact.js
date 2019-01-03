import React, { Component } from 'react'
import { Consumer } from "../../context"
import TextInputGroup from "../layout/TextInputGroup"
import Axios from 'axios';

export default class EditContact extends Component {
    state = {
        name: "",
        email: "",
        phone: "",
        errors: {}
    }

    onChange = e => this.setState({
        [e.target.name]: e.target.value
    });

    async componentDidMount() {
        const { id } = this.props.match.params;
        const res = await Axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

        const contact = res.data;

        this.setState({
            name: contact.name,
            email: contact.email,
            phone: contact.phone
        })
    }

    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        const { name, email, phone } = this.state;

        if (name.trim() === "") {
            this.setState({ errors: { name: "Name is required" } });
            return;
        }
        if (email.trim() === "") {
            this.setState({ errors: { email: "Email is required" } });
            return;
        }
        if (phone.trim() === "") {
            this.setState({ errors: { phone: "Phone is required" } });
            return;
        }

        const updatedContact = {
            name,
            email,
            phone
        }

        const { id } = this.props.match.params;
        const res = await Axios.patch(`https://jsonplaceholder.typicode.com/users/${id}`,
            updatedContact)

        dispatch({ type: "UPDATE_CONTACT", payload: res.data });

        this.setState({
            name: "",
            email: "",
            phone: ""
        })

        this.props.history.push("/");
    }

    render() {
        const { name, email, phone, errors } = this.state;

        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card mb-3">
                            <div className="card-header">Edit Contact</div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                    <TextInputGroup label="Name" name="name"
                                        placeholder="Enter Name" value={name}
                                        onChange={this.onChange} error={errors.name} />
                                    <TextInputGroup label="Email" name="email"
                                        placeholder="Enter email" value={email}
                                        onChange={this.onChange} type="email" error={errors.email} />
                                    <TextInputGroup label="Phone" name="phone"
                                        placeholder="Enter Phone" value={phone}
                                        onChange={this.onChange} error={errors.phone} />
                                    <input type="submit" value="Update Contact"
                                        className="btn btn-primary btn-lg col-12 col-md-3 px-0" />
                                </form>
                            </div>
                        </div>
                    )
                }}
            </Consumer>
        )

    }
}
