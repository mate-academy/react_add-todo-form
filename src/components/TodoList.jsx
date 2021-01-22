import React from 'react';
import './TodoList.css';
import PropTypes from 'prop-types';

export const TodoList = ({ todos }) => (
  <ul className="list">
    {todos.map(todo => (
      <li key={todo.id}>
        <div className="todo">
          <p className="todo-title">{todo.title}</p>
          <div className="todo-data">
            <p>{todo.userName}</p>
            <hr />
            <p>{todo.completed ? 'finished' : 'unfinished'}</p>
          </div>
        </div>
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
};
