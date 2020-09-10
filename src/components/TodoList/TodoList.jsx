import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TodoList.scss';

export const TodoList = ({ todos, users }) => (
  <ul className="todoList">
    {todos.map(todo => (
      <li
        className={classNames(
          'todoList__todo',
          { red: !todo.completed },
        )}
        key={todo.id}
      >
        <span>
          {todo.title}
        </span>
        {' by '}
        <span>
          {users.find(user => user.id === todo.userId).name}
        </span>
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })),
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })),
};

TodoList.defaultProps = {
  todos: [],
  users: [],
};
