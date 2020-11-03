import React from 'react';
import PropTypes from 'prop-types';
import { User } from './User';

export const SelectUser = ({ handleSelect, todoId, users }) => (
  <select
    className="ui selection dropdown"
    value={todoId}
    onChange={handleSelect}
  >
    <option value="error">---- Choose a user ----</option>
    <User users={users} />
  </select>
);

SelectUser.propTypes = PropTypes.shape({
  handleSelect: PropTypes.func.isRequired,
  todoId: PropTypes.number.isRequired,
  users: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
}).isRequired;
