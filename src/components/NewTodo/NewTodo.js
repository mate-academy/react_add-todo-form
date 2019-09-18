import React from 'react';
import './NewTodo.css';
import { NewTodoPropTypes } from '../../constants/proptypes';

const NewTodo = ({
  users,
  handleSubmitNewTodo,
  handleInputChange,
  handleSelectChange,
  titleValue,
  userValue,
  isErrorTitle,
  isErrorUser,
}) => (
  <div className="wrapper">
    <h1 className="header">Static list of todos</h1>
    <div className="form-container">
      <h2 className="form-heading">Add new todo</h2>
      <form onSubmit={handleSubmitNewTodo} className="form">
        <div className="form-item">
          <label>
            <input
              className="form-input"
              type="text"
              name="title"
              value={titleValue}
              onChange={event => handleInputChange(event.target.value)}
              maxLength={25}
              placeholder="Enter what to do"
            />
          </label>
          <p
            className={isErrorTitle ? 'form-error' : 'form-error hidden'}
          >
            Please enter the title
          </p>
        </div>
        <div className="form-item">
          <label>
            <select
              className="form-select"
              name="user"
              value={userValue}
              onChange={event => handleSelectChange(event.target.value)}
            >
              <option value={0}>Choose a user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </label>
          <p
            className={isErrorUser ? 'form-error' : 'form-error hidden'}
          >
            Please choose a user
          </p>
        </div>
        <button type="submit" className="form-btn">Add</button>
      </form>
    </div>
  </div>
);

NewTodo.propTypes = NewTodoPropTypes;

export default NewTodo;
