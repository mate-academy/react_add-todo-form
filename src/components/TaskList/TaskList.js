import React from 'react';
import PropTypes from 'prop-types';
import './TaskList.css';

const TaskList = ({ tasks }) => (
  <>
    <div className="container">
      <ul>
        {tasks.map(task => (

          <li key={task.id}>
            <div className="task">
              <h2>{task.title}</h2>
              <p>{task.user.name}</p>
            </div>

          </li>

        ))}
      </ul>
    </div>
  </>
);

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default TaskList;
