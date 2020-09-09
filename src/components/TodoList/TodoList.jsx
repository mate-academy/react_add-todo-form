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
  todos: PropTypes.arrayOf(PropTypes.object),
  users: PropTypes.arrayOf(PropTypes.object),
};

TodoList.defaultProps = {
  todos: [],
  users: [],
};
