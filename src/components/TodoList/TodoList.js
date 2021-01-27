import React from 'react';
import PropTypes from 'prop-types';

export const TodoList = ({ todoList }) => (
  <div>
    <table>
      <thead>
        <tr>
          <th>Todo name</th>
          <th>User name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {todoList.map(todo => (
          <tr key={todo.id}>
            <td>{todo.title}</td>
            <td>{todo.user.name}</td>
            <td>{todo.completed ? 'Completed' : 'In progress'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
  })).isRequired,
};
