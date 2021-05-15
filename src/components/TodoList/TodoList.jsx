import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';

export function TodoList({ todos, changeStatusHandler }) {
  return (
    <div className="todo-list">
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <Todo {...todo} handler={changeStatusHandler} />
          </li>
        ))}
      </ul>
    </div>
  );
}

const UserType = PropTypes.shape({
  name: PropTypes.string.isRequired,
});

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: UserType.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  changeStatusHandler: PropTypes.func.isRequired,
};
