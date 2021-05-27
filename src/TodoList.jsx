import React from 'react';
import PropTypes from 'prop-types';

export function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(task => (
        <li key={task.id}>
          {'ID: '}
          {task.userId}
          {' '}
          {'NAME: '}
          {task.user.name}
          {' TASK: '}
          {task.title}
          {' - '}
          {task.completed ? 'Task is completed' : 'Task is NOT completed'}
        </li>
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
