import React from "react";
import PropTypes from "prop-types";

export default function ContactItem({ id, name, number, onDelete }) {
  return (
    <li>
      <p>
        {name}: {number}
      </p>
      <button type="button" id={id} onClick={() => onDelete(id)}></button>
    </li>
  );
}

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string,
  onDelete: PropTypes.func,
};
