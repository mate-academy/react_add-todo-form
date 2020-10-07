import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';
import './TodoList.scss';

export const TodoList = ({ preparedTodos }) => (
  <ul className="todoList">
    {preparedTodos.map(todo => (
      <li key={todo.id} className="todoList__todo">
        <Todo {...todo} />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  preparedTodos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })),
};

TodoList.defaultProps = {
  preparedTodos: [],
};
