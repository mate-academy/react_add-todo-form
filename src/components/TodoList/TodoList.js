import React from 'react';
import PropTypes from 'prop-types';

import Todo from '../Todo/Todo';
import './TodoList.css';

const TodoList = ({ todos }) => (
  <ul className="App__TodoList TodoList">
    {todos.map(todo => <Todo key={todo.id} todo={todo} />)}
  </ul>
);

export default TodoList;

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
