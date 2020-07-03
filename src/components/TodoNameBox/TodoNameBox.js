import React from 'react';
import PropTypes from 'prop-types';
import { UsersListShape } from '../Shapes/UsersListShape';
import './TodoNameBox.css';

const TodoNameBox = ({ usersList, handleNameChange, userId }) => (
  <select
    value={userId}
    onChange={handleNameChange}
    className="App__box"
    required
  >
    <option value="" disabled>Choose a user</option>
    { usersList.map(user => (
      <option
        className="App__name"
        name={user.name}
        value={user.id}
        key={user.id}
      >
        {user.name}
      </option>
    ))}
  </select>
);

TodoNameBox.propTypes = {
  usersList: UsersListShape.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default TodoNameBox;
