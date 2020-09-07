import React from 'react';
import PropTypes from 'prop-types';
import Todo from '../Todo';
import './TodoList.css';

function TodoList({ todos }) {
  return (
    <ul className="TodoList">
      {todos.map(todo => (
        <li key={todo.id}>
          <Todo {...todo} />
        </li>
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(Todo.propTypes).isRequired,
};

export default TodoList;
