import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

import { typeTodo } from '../types';
import './TodoList.scss';

const TodoList = ({ todos }) => (
  <ul className="list">
    {todos.map(todo => (
      <Todo todo={todo} key={todo.id} />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(typeTodo).isRequired,
};

export default TodoList;
