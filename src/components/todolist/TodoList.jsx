import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../todo';
import { TodoShape } from '../shapes/ToDoShape';
import './TodoList.scss';

export const TodoList = ({ todos }) => (
  <div>
    {todos.map(todo => (
      <Todo
        key={todo.id}
        {...todo}
      />
    ))}
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoShape).isRequired,
};
