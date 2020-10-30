import React from 'react';
import PropTypes from 'prop-types';
import './FormSelect.css';

import { SelectOption } from '../SelectOption';

export const FormSelect = ({ addTodoUserId, users }) => (
  <select
    className="form__select select"
    onChange={(event) => {
      addTodoUserId(event.target.value);
    }}
  >
    <SelectOption users={users} />
  </select>
);

FormSelect.propTypes = {
  addTodoUserId: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
