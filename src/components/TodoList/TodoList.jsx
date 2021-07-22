import React from 'react';
import './TodoList.css';
import PropTypes from 'prop-types';

const TodoList = ({ todos }) => (
  <div className="todosList">
    {todos.map(todo => (
      <div className="todo" key={todo.userName + todo.id}>
        <h2>{todo.userName}</h2>
        <span>{todo.title.replace(/[^a-z\u0400-\u04FF]/gi, '')}</span>
        <p>{todo.completed ? 'copmleted' : 'in the process...'}</p>
      </div>
    ))}
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default TodoList;
