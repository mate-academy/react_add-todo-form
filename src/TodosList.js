import React from 'react';
import PropTypes from 'prop-types';

const TodosList = ({ todos }) => (
  <table>
    <thead>
      <tr>
        <th>№</th>
        <th>TODO item</th>
        <th>User</th>
      </tr>
    </thead>
    <tbody>
      { todos.map(todo => (
        <tr key={todo.id}>
          <td>{todo.id}</td>
          <td>{todo.title}</td>
          <td>{todo.user.name}</td>
        </tr>
      )) }
    </tbody>
  </table>
);

TodosList.propTypes = { todos: PropTypes.arrayOf(PropTypes.object).isRequired };

export default TodosList;
