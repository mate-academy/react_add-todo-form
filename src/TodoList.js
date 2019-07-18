import PropTypes from 'prop-types';
import React from 'react';
import './App.css';

const TodoList = ({ todos }) => (
  <table className="todo-list">
    <thead>
      <tr className="todo-list__row">
        <th>Id</th>
        <th>Name</th>
        <th>Title</th>
        <th>Completed</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <tr
          key={todo.id}
          className="todo-list__row"
        >
          <td>{todo.id}</td>
          <td>{todo.userName}</td>
          <td>{todo.title}</td>
          <td>{todo.completed || 'x'}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
