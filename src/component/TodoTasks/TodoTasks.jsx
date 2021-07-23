import React from 'react';
import PropTypes from 'prop-types';
import { todosProps, usersProps } from '../../proptypes';

export const TodoTasks = ({ todos, users }) => (
  <table className="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Title</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <tr
          key={todo.id}
          className={`table-${todo.completed ? 'success' : 'danger'}`}
        >
          <td>{todo.id}</td>
          <td>{users.find(user => user.id === todo.userId).name}</td>
          <td>{todo.title}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

TodoTasks.propTypes = {
  todos: PropTypes.arrayOf(todosProps).isRequired,
  users: PropTypes.arrayOf(usersProps).isRequired,
};
