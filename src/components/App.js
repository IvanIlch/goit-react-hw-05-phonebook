import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { CSSTransition } from "react-transition-group";
import ContactForm from "./form/Form";
import Filter from "./filter/Filter";
import ContactList from "./contactList/ContactList";
import Notification from "./notification/Notification";
import Layout from "./layuot/Layout";
import styles from "./App.module.css";
import NotificationInput from "./notification/NotificationInput";

export default class App extends Component {
  state = {
    contacts: [],
    filter: "",
    hasUser: false,
    notHasAllInput: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const contactsFromLS = localStorage.getItem("contacts");
    if (contactsFromLS) {
      this.setState({
        contacts: JSON.parse(contactsFromLS),
      });
    }
  }

  searchContact = (filter) => {
    this.setState({ filter });
  };

  getVisibleContact = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  addToContacts = (state) => {
    const { name, number } = state;
    if (name === "" || number === "") {
      this.setState({ notHasAllInput: true });
      setTimeout(() => this.setState({ notHasAllInput: false }), 3000);
    } else {
      if (
        this.state.contacts.find(
          (contact) => contact.name.toLowerCase() === name.toLowerCase()
        )
      ) {
        this.setState({ hasUser: true });
        setTimeout(() => this.setState({ hasUser: false }), 3000);
      } else {
        this.setState((prevState) => {
          return {
            contacts: [
              ...prevState.contacts,
              { name: name, id: uuidv4(), number: number },
            ],
          };
        });
      }
    }
  };
  onDelete = (id) => {
    return this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter((contact) => contact.id !== id),
      };
    });
  };

  render() {
    const { filter, contacts, hasUser, notHasAllInput } = this.state;
    const visibleContact = this.getVisibleContact();
    return (
      <Layout>
        <CSSTransition
          in={notHasAllInput}
          appear={true}
          timeout={500}
          classNames={styles}
          unmountOnExit
        >
          <NotificationInput />
        </CSSTransition>

        <CSSTransition
          in={hasUser}
          appear={true}
          timeout={500}
          classNames={styles}
          unmountOnExit
        >
          <Notification />
        </CSSTransition>

        <CSSTransition
          in={true}
          appear={true}
          timeout={500}
          classNames={styles}
          unmountOnExit
        >
          {(stage) => {
            return (
              <>
                <h1 className={styles.title}>Phonebook</h1>
                <CSSTransition
                  in={stage === "entered"}
                  appear={true}
                  timeout={500}
                  classNames={styles}
                  unmountOnExit
                >
                  <ContactForm addToContacts={this.addToContacts} />
                </CSSTransition>
                <CSSTransition
                  in={stage === "entered" && contacts.length > 0}
                  appear={true}
                  timeout={500}
                  classNames={styles}
                  unmountOnExit
                >
                  <>
                    <h2 className={styles.title}>Contacts</h2>
                    <CSSTransition
                      in={contacts.length > 0}
                      appear={true}
                      timeout={500}
                      classNames={styles}
                      unmountOnExit
                    >
                      <Filter
                        value={filter}
                        searchContact={this.searchContact}
                      />
                    </CSSTransition>
                    <CSSTransition
                      in={contacts.length > 0}
                      appear={true}
                      timeout={500}
                      classNames={styles}
                      unmountOnExit
                    >
                      <ContactList
                        visibleContact={visibleContact}
                        onDelete={this.onDelete}
                      />
                    </CSSTransition>
                  </>
                </CSSTransition>
              </>
            );
          }}
        </CSSTransition>
      </Layout>
    );
  }
}
