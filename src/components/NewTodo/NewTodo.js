import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { userShape } from '../../shapes/userShape';
import './NewTodo.css';

export const NewTodo = props => (
  <form className="form" onSubmit={props.onFormSubmit}>
    <div className="form__field">
      <input
        className={
          `form__input ${props.titleInputError && 'form__input--error'}`
        }
        type="text"
        placeholder="Enter your todo"
        value={props.title}
        maxLength={40}
        onChange={props.onInputChange}
      />
      {
        props.titleInputError
        && <ErrorMessage message="Please enter the title" />
      }
    </div>
    <div className="form__field">
      <select
        className={
          `form__input ${props.userSelectError && 'form__input--error'}`
        }
        value={props.userId}
        onChange={props.onUserChange}
      >
        <option value={0}>Choose a user</option>
        {props.users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      {
        props.userSelectError
        && <ErrorMessage message="Please choose a user" />
      }
    </div>
    <button className="form__submit" type="submit">Add</button>
  </form>
);

NewTodo.propTypes = {
  users: PropTypes.arrayOf(userShape).isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  titleInputError: PropTypes.bool.isRequired,
  userSelectError: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onUserChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};
