import React from 'react';
import PropTypes from 'prop-types';

const defaultSelected = 'Choose a user';

export const NewTodoSelect = ({ users, handleSelect, user }) => (
  <>
    <label htmlFor="todoSelectUser">Chose user</label>
    <select
      className={`form-control ${!user.isValid && 'is-invalid'}`}
      value={user.value || defaultSelected}
      onChange={(event) => {
        handleSelect('user', event.target.value);
      }}
    >
      <option disabled>{defaultSelected}</option>
      {
        users.map(person => (
          <option key={person.id}>{person.name}</option>
        ))
      }
    </select>
    {!user.isValid && (
      <small className="text-danger">Please choose a user</small>
    )}
  </>
);

NewTodoSelect.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  handleSelect: PropTypes.func.isRequired,
};
