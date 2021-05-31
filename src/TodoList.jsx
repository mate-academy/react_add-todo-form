import React from 'react';
import './TodoList.css';
import PropTypes from 'prop-types';

export const TodoList = ({ todos }) => (
  <table className="table">
    <thead>
      <tr>
        <th className="th">Id</th>
        <th className="th">Users</th>
        <th className="th">TODOs</th>
      </tr>
    </thead>
    {todos.map(todo => (
      <tbody key={todo.id}>
        <tr>
          <td className="td td-id">{todo.id}</td>
          <td className="td td-name" key={todo.id}>{todo.user.name}</td>
          <td className="td td-title">{todo.title}</td>
        </tr>
      </tbody>
    ))}
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
};
