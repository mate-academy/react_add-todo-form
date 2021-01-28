import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';

export const TodoList = ({ tasks }) => (
  <ol>
    {tasks.map(task => (
      <li
        className="task"
        key={task.id}
      >
        <label>
          <span className="task__title--not">
            TASK:
          </span>
          {task.title}
          <br />
          <span>
            {`Employee: ${task.userName}`}
          </span>
        </label>
      </li>
    ))}
  </ol>
);

TodoList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
