import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TodoItem = ({ id, title, person, completed, toggleComplete }) => (
  <li
    className={classNames(
      'todo__item',
      { 'todo__item-done': completed },
    )}
    key={id}
  >
    <h2 className="todo__title">
      {id}
      {'. '}
      {title}
    </h2>
    <p className="todo_personName">
      {person.name}
    </p>
    <label className="checkbox-label">
      <input
        className="todo__checkbox"
        type="checkbox"
        checked={completed}
        onChange={() => toggleComplete(id)}
      />
      {completed ? 'Done' : 'In Process'}
    </label>
  </li>
);

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
};
