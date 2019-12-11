import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ todos }) => (
  <table className="todolist">
    <thead>
      <tr>
        <th className="todolist--id">ID</th>
        <th className="todolist--title">Title</th>
        <th className="todolist--user">User</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <tr key={todo.id}>
          <td>{todo.id}</td>
          <td>{todo.title}</td>
          <td>{todo.user.name}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

TodoList.propTypes = { todos: PropTypes.arrayOf(PropTypes.object).isRequired };

export default TodoList;
