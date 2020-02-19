import React from 'react';
import PropTypes from 'prop-types';

import './NewTodo.css';

export const NewTodo = (
  { errors,
    addTask,
    handleChange,
    selectedUserId,
    title,
    userId,
    users },
) => (
  <>
    <form onSubmit={addTask} className="form">
      <label htmlFor="search-query" className="form__label">
        Task
      </label>
      <input
        onChange={handleChange}
        type="text"
        id="search-query"
        className="form__taskText"
        maxlenght={50}
        value={title}
        placeholder="Type task"
      />
      <div className="selectSubmitWrapper">
        <select
          value={userId}
          onChange={selectedUserId}
          className="form__select"
        >
          <option disabled value={0}>Choose a user</option>
          {users.map(user => (
            <option key={user.username} value={user.id}>{user.name}</option>
          ))}
        </select>
        <button
          type="submit"
          className="form__button"
        >
          Add
        </button>
      </div>
      <div className={!errors ? 'errors_hidden' : 'errors'}>
        <div className={
          userId !== 0 ? 'errors__user-hidden' : 'errors__user'
        }
        >
          Please choose a user
        </div>
        <div className={
          title.length !== 0 ? 'errors__user-hidden' : 'errors__title'
        }
        >
          Please enter the title
        </div>
      </div>
    </form>
  </>
);

NewTodo.propTypes = {
  errors: PropTypes.bool.isRequired,
  addTask: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  selectedUserId: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
