import React from 'react';
import PropTypes from 'prop-types';

export const TodoItem = ({ todo, toggleComplete }) => (
  <li
    className={
      !todo.completed
        ? 'todo__item'
        : 'todo__item todo__item-done'
    }
    key={todo.id}
  >
    <h2 className="todo__title">
      {todo.id}
      {'. '}
      {todo.title}
    </h2>
    <p className="todo_personName">
      {todo.person.name}
    </p>
    <label className="checkbox-label">
      <input
        className="todo__checkbox"
        type="checkbox"
        checked={todo.complete}
        onChange={() => toggleComplete(todo.id)}
      />
      {todo.completed ? 'Done' : 'In Process'}
    </label>
  </li>
);

TodoItem.propTypes = {
  todo: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleComplete: PropTypes.func.isRequired,
};
