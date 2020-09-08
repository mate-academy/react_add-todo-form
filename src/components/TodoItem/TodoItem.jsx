import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TodoItem = ({ id, title, person, completed }) => (
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
    {completed ? 'Done' : 'In Process'}
  </li>
);

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
