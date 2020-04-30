import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import User from '../User/User';

const TodoItem = ({
  title,
  completed,
  user,
  id,
  index,
  setTodoStatus,
  deleteTodo,
}) => (
  <li className={cn('todo__item', { 'todo__item--done': completed })}>
    <label htmlFor={id} className="todo__label">
      <span className="todo__item-index">{`${index}. `}</span>
      <span className="todo__item-title">{title}</span>
      <User {...user} />
      <button
        type="button"
        className="todo__delete-btn"
        onClick={() => deleteTodo(id)}
      />
      <input
        id={id}
        type="checkbox"
        checked={completed}
        className="todo__item-checkbox"
        onChange={() => setTodoStatus(id)}
      />
    </label>
  </li>
);

TodoItem.defaultProps = {};

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  setTodoStatus: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;
