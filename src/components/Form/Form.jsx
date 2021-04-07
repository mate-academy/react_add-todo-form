import React from 'react';
import propTypes from 'prop-types';

import './form.css';

export const Form = ({ users, handleChangeSelector,
  handleChangeText, valueSelector, valueText, add }) => (
    <form onSubmit={add} className="form">
      <select value={valueSelector} onChange={handleChangeSelector}>
        <option value="Choose user">Choose user</option>
        {users.map(user => (
          <option value={user.name} key={user.id}>{user.name}</option>
        ))}
      </select>
      <input
        value={valueText}
        onChange={handleChangeText}
        type="text"
      />
      <button type="submit">
        Add
      </button>
    </form>
);

Form.propTypes = {
  users: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string.isRequired,
      id: propTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  valueSelector: propTypes.string.isRequired,
  valueText: propTypes.string.isRequired,
  handleChangeSelector: propTypes.func.isRequired,
  handleChangeText: propTypes.func.isRequired,
  add: propTypes.func.isRequired,
};
