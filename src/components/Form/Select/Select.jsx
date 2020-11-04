import React from 'react';
import propTypes from 'prop-types';
import { UsersShape } from '../../shapes/UsersShape';

export const Select = ({ user, onChange, users, userMessage }) => (
  <label>
    <select
      className="input"
      value={user}
      name="user"
      onChange={onChange}
    >
      <option value="">Please, choose user</option>
      {users.map(person => (
        <option value={person.name} key={person.id}>
          {person.name}
        </option>
      ))}
    </select>
    {userMessage ? <p className="message">{userMessage}</p> : ''}
  </label>
);

Select.propTypes = {
  user: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  users: propTypes.arrayOf(propTypes.shape(UsersShape)).isRequired,
  userMessage: propTypes.string.isRequired,
};
