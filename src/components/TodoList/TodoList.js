import React from 'react';
import PropTypes from 'prop-types';

export const TodoList = ({ tasks }) => (
  <ol>
    {tasks.map(task => (
      <li key={task.id}>
        <span>
          {`TASK: ${task.title}`}
        </span>
        <input
          type="checkbox"
        />
        <br />
        <span>
          {`Employee: ${task.user.name}`}
        </span>
      </li>
    ))}
  </ol>
);

TodoList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
};
