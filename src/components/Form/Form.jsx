import React from 'react';
import PropTypes from 'prop-types';
import users from '../../api/users';
import { TodoShape } from '../shapes/TodoShape';

export const Form = (
  { todos, onSelect, onInput, onAdd, newTodoTitle, selected },
) => (

  <form className="todo__form">
    <div className="select">
      <select
        name="user-name"
        onChange={onSelect}
        value={selected}
      >
        <option value="">
          Choose name
        </option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
    <input
      type="text"
      name="new-todo"
      onChange={onInput}
      value={newTodoTitle}
      placeholder="Enter your task (letters, numbers and space only)"
      className="input todo__input"
    />
    <button
      type="submit"
      onClick={onAdd}
      className="button is-dark"
    >
      Add task
    </button>
  </form>
);

Form.propTypes = {
  todos: PropTypes.arrayOf(TodoShape).isRequired,
  onSelect: PropTypes.func.isRequired,
  onInput: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  newTodoTitle: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
};
