import React from 'react';
import PropTypes from 'prop-types';
import './Form.css';

export const Form = ({
  users,
  userNameHandler,
  addUserHandler,
  valueTitle,
  valueUser,
  classValidTitle,
  classValidUser,
}) => (
  <div className="form-style-6">
    <form onSubmit={addUserHandler}>
      <h1>Add Todo form</h1>
      <p>
        <span>Users: </span>
        {users.length}
      </p>
      <select name="userName" onChange={userNameHandler} value={valueUser}>
        <option name="userName">Please select User...</option>
        {users.map(el => <option key={el.id}>{el.name}</option>)}
      </select>
      <p className={`validation ${classValidUser}`}>Please choose a user</p>
      <input
        onChange={userNameHandler}
        name="title"
        type="text"
        placeholder="Write a title..."
        maxLength={64}
        value={valueTitle}
      />
      <p className={`validation ${classValidTitle}`}>Please enter the title</p>
      <input type="submit" value="Add" />
    </form>
  </div>
);

Form.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  userNameHandler: PropTypes.func.isRequired,
  addUserHandler: PropTypes.func.isRequired,
  valueTitle: PropTypes.string.isRequired,
  valueUser: PropTypes.string.isRequired,
  classValidTitle: PropTypes.string.isRequired,
  classValidUser: PropTypes.string.isRequired,
};
