import React from 'react';
import PropTypes from 'prop-types';

const TasksList = ({ tasks }) => (
  <ul>
    {tasks.map(task => (
      <li key={task.id}>
        <h3>{task.user.name}</h3>
        <p>{task.title}</p>
      </li>
    ))}
  </ul>
);

TasksList.propTypes = {
  tasks: PropTypes.arrayOf({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default TasksList;
