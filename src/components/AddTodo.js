import React from 'react';
import PropTypes from 'prop-types';

const AddTodo = (props) => {
  const {
    users, errorsMap, valuesMap, handleSubmit, handleChange,
  } = props;

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.username}>
      {user.username}
      {' '}
(id:
      {user.id}
)
    </option>
  ));

  return (
    <div>
      <form onSubmit={handleSubmit} className="add-todo-form">
        <div className="add-todo-form__input-container">
          {errorsMap.todoTitle
            && (
              <p className="add-todo-form__error-message">
                {errorsMap.todoTitle}
              </p>
            )
          }

          <label htmlFor="todoField">
            Todo:
            <input
              name="todoTitle"
              type="text"
              placeholder="Todo Title (max 50 signs)"
              id="todoField"
              maxLength="50"
              value={valuesMap.todoTitle}
              onChange={handleChange}
            />
          </label>

        </div>

        <div className="add-todo-form__input-container">
          {errorsMap.userOwnTodo
            && (
              <p className="add-todo-form__error-message">
                {errorsMap.userOwnTodo}
              </p>
            )
          }

          {/* Линтер не видит ID у select */}
          {/* eslint-disable */}
          <label htmlFor="userSelectId">
            For User:
            <select
              name="userOwnTodo"
              id="userSelectId"
              value={valuesMap.userOwnTodo}
              onChange={handleChange}
            >
              <option disabled hidden />
              {usersOptions}
            </select>
          </label>
          {/* eslint-enable */}
        </div>

        <button type="submit">Add Todo</button>
      </form>
    </div>

  );
};

AddTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  errorsMap: PropTypes.shape({
    todoTitle: PropTypes.string,
    userOwnTodo: PropTypes.string,
  }).isRequired,
  valuesMap: PropTypes.shape({
    todoTitle: PropTypes.string,
    userOwnTodo: PropTypes.string,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default AddTodo;
