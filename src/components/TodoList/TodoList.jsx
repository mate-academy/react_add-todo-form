import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';
import './TodoList.scss';

export const TodoList = ({ todos }) => (
  <div className="todo">
    <ul className="todo__list">
      <li className="todo__item todo__item--main">
        <p>Title</p>
        <p>Status</p>
        <p>User name</p>
      </li>
      {todos.map(todo => (
        <li
          key={todo.id}
          className="todo__item"
        >
          <Todo {...todo} />
        </li>
      ))}
    </ul>
  </div>

);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }),
    }),
  ),
};

TodoList.defaultProps = {
  todos: [],
};
