import React from "react";
import PropTypes from "prop-types";

import ContactItem from "../contactItem/ContactItem";
import styles from "./ContactList.module.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function ContactList({ visibleContact, onDelete }) {
  return (
    <>
      <TransitionGroup component="ul" className={styles.contacts}>
        {visibleContact.map((contact) => (
          <CSSTransition key={contact.id} classNames={styles} timeout={250}>
            <ContactItem
              name={contact.name}
              number={contact.number}
              id={contact.id}
              onDelete={onDelete}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
}
ContactList.propTypes = {
  visibleContact: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string,
    })
  ),
  onDelete: PropTypes.func,
};
