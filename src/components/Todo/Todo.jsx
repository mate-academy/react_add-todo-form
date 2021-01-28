import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User';

export const Todo = ({ task }) => (
  <div className="card bg-light mb-3 todo">
    <p className="h4">{task.title}</p>
    {task.completed
      ? <p className="completed">Done</p>
      : <p className="uncompleted">In process</p>}
    <User user={task.user} />
  </div>
);

Todo.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};
