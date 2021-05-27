import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Todo.scss';

import { User } from '../User';

export function Todo({ title, completed, user }) {
  return (
    <div className="todo">
      <p className="todo__title">Task name:</p>
      <p className="todo__task-name">{title}</p>
      <p className="todo__title">
        Execution status:
      </p>
      <p className={classNames({
        todo__completed: completed,
        todo__inprogress: !completed,
      })}
      >
        {completed ? 'completed' : 'in progress'}
      </p>

      <User {...user} />
    </div>
  );
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape().isRequired,
};
