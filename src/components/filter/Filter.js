import React from "react";
import styles from "./Filter.module.css";
import PropTypes from "prop-types";

export default function Filter({ value, searchContact }) {
  return (
    <label className={styles.label}>
      Find contact by name
      <input
        className={styles.input}
        type="text"
        name="filter"
        value={value}
        placeholder="Пошук"
        onChange={(e) => searchContact(e.target.value)}
      ></input>
    </label>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  searchContact: PropTypes.func,
};
