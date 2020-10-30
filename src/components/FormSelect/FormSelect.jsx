import React from 'react';
import PropTypes from 'prop-types';
import './FormSelect.css';

import { SelectOption } from '../SelectOption';

export const FormSelect = (
  { addTodoUserId,
    users,
    username,
    handleChange },
) => (
  <select
    className="form__select select"
    name="username"
    id="username"
    value={username}
    onChange={(event) => {
      addTodoUserId(event.target.value);
      handleChange(event.target);
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
  username: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
