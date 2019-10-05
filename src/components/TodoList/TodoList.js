import React from 'react';

import './TodoList.css';
import propTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ todos }) => (
  <ul className="todo-list">
    { todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: propTypes.shape(TodoList).isRequired,
};

export default TodoList;
