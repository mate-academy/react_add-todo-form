import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ todos }) => (
  <table>
    <thead>
      <tr>
        <th>№</th>
        <th>TODO item</th>
        <th>User Name</th>
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

TodoList.propTypes = { todos: PropTypes.arrayOf(PropTypes.object).isRequired };

export default TodoList;
