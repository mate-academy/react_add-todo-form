import React from 'react';
import PropTypes from 'prop-types';

export function ToDoList({ todos }) {
  return (
    <table className="ui celled table">
      <thead>
        <tr>
          <th>Title</th>
          <th>User Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <tr key={todo.id}>
            <td>
              {todo.title}
            </td>
            <td>
              {/* {users.filter(user => user.id === todo.userId)} */}
              {todo.user.name}
            </td>
            <td>
              {todo.completed ? 'competed' : 'not competed'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

ToDoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
};
