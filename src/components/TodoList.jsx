import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Todo';

export const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <Todo
        key={todo.id}
        userName={todo.name}
        title={todo.title}
        state={todo.completed}
      />
    ))}
  </ul>
);

TodoList.propTypes = PropTypes.arrayOf(PropTypes.shape({
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
}).isRequired).isRequired;
