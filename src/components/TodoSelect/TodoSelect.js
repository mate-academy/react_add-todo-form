import React from 'react';
import PropTypes from 'prop-types';

const defaultSelect = 'Choose a user';

export const TodoSelect = ({ users, handleSelect, user }) => (
  <>
    <label htmlFor="todoSelectUser">Choose user</label>
    <select
      className={`form-control ${!user.isValid && 'is-invalid'}`}
      value={user.value || defaultSelect}
      onChange={(event) => {
        handleSelect('user', event.target.value);
      }}
    >
      <option disabled>{defaultSelect}</option>
      {
        users.map(person => (
          <option key={person.id}>{person.name}</option>
        ))
      }
    </select>
    {!user.isValid && (
      <small>Please choose a user</small>
    )}
  </>
);

TodoSelect.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  handleSelect: PropTypes.func.isRequired,
};
