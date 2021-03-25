import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';
import './TodoList.css';

export const TodoList = ({ todos }) => (
  <table className="table">
    <thead>
      <tr>
        <th className="table__header">User</th>
        <th className="table__header">Title</th>
        <th className="table__header">Status</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <tr key={todo.id}>
          <Todo {...todo} />
        </tr>
      ))}
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};
