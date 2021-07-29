import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';

export const TodoList = ({ todos }) => (
  <ul className="">
    {todos.map(todo => (
      <li key={todo.id}>
        <Todo
          title={todo.title}
          completed={todo.completed}
          user={todo.user.name}
        />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
