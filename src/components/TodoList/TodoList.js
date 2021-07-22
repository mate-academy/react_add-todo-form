import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';
import { PreparedTodoType } from '../../types';

export const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>
        <Todo
          title={todo.title}
          completed={todo.completed}
          user={todo.user}
        />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PreparedTodoType).isRequired,
};
