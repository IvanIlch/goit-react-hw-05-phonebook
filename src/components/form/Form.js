import React, { Component } from "react";
import styles from "./Form.module.css";

const inicial_state = {
  name: "",
  number: "",
};

export default class ContactForm extends Component {
  state = { ...inicial_state };
  addToName = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addToContacts(this.state);
    this.setState({ ...inicial_state });
  };

  render() {
    return (
      <form className={styles.form}>
        <label>
          Name
          <input
            value={this.state.name}
            type="text"
            name="name"
            placeholder="Введіть ім'я"
            onChange={this.addToName}
          ></input>
        </label>
        <label>
          Phone
          <input
            value={this.state.number}
            type="tel"
            name="number"
            placeholder="Введіть телефон"
            onChange={this.addToName}
          ></input>
        </label>
        <button type="submit" onClick={this.handleSubmit}>
          Add contact
        </button>
      </form>
    );
  }
}
