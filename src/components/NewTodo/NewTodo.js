import React from 'react';
import './NewTodo.css';

export const NewTodo = ({
  users,
  handleClick,
  handleChange,
  currentSelect,
  todoName,
  errorTitle,
  errorUser,
}) => (
  <div className="main-form">
    <h2>Add new task</h2>
    <form onSubmit={handleClick} className="form">
      <div className="form-group">
        <input
          className="form-control"
          id="formGroupExampleInput"
          type="text"
          name="title"
          placeholder="Add your todo"
          onChange={handleChange}
          value={todoName}
          maxLength={30}
        />
        {errorTitle && <small className="font-italic">{errorTitle}</small>}
      </div>
      <div className="form-group">
        <select
          className="custom-select"
          name="username"
          id=""
          onChange={handleChange}
          value={currentSelect}
        >
          <option selected disabled value="">
            Choose a user
          </option>
          {users.map((user, i) => (
            <option value={i}>{user.name}</option>
          ))}
        </select>
        {errorUser && <small className="font-italic">{errorUser}</small>}
      </div>
      <button type="submit" className="btn btn-dark">Submit</button>
    </form>
  </div>
);
