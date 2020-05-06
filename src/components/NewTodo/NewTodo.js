import React from 'react';
import PropTypes from 'prop-types';

import './NewTodo.css';

export const NewTodo = ({
  users,
  newTodoText,
  selectedUserId,
  handleInputChange,
  handleSelectChange,
  handleFormSubmit,
  hasUserError,
  hasTextError,
}) => (
  <form className="form" onSubmit={handleFormSubmit}>
    <div className="form__input">
      <input
        className="form__input_textarea"
        type="text"
        value={newTodoText}
        onChange={handleInputChange}
        maxLength={100}
        placeholder="Add new task"
      />

      {hasTextError && (
        <span className="form__error">Please add a new task</span>
      )}
    </div>

    <div className="form__select">
      <select
        className="form__select_values"
        value={selectedUserId}
        onChange={handleSelectChange}
      >
        <option value="0" hidden>
          Select a user
        </option>
        {users.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>

      {hasUserError && (
        <span className="form__error">Please select a user</span>
      )}
    </div>

    <button type="submit" className="form__btn">
      Add new task
    </button>
  </form>
);

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  newTodoText: PropTypes.string.isRequired,
  selectedUserId: PropTypes.number.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  hasUserError: PropTypes.bool.isRequired,
  hasTextError: PropTypes.bool.isRequired,
};
