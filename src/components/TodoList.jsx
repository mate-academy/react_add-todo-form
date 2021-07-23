import React from 'react';
import PropTypes from 'prop-types';

export const TodoList = ({ todos }) => (
  <table className="Table">
    <caption className="caption">The list of Todos</caption>
    <tbody>
      <tr className="headerTable">
        <th>#</th>
        <th>Todo</th>
        <th>Responsible</th>
        <th>Completed</th>
      </tr>
      {todos.map(todo => (
        <tr key={todo.id}>
          <td>{todo.id}</td>
          <td>{todo.title}</td>
          <td>{todo.user.name}</td>
          <td><input type="checkbox" /></td>
        </tr>
      ))}
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      title: PropTypes.string,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }.isRequired),
    }).isRequired,
  ).isRequired,
};
