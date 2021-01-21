import React from 'react';
import PropTypes from 'prop-types';

export function ToDoList({ todos }) {
  return (
    <table className="table">

      <thead className="col-md-6">
        <tr>
          <th>Title</th>
          <th>User Name</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody className="tbody">
        {todos.map(todo => (
          <tr key={todo.id}>
            <td>
              {todo.title}
            </td>

            <td>
              {todo.user.name}
            </td>

            <td>
              {todo.completed ? 'completed' : 'not completed'}
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
