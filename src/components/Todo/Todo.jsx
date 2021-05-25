import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { User } from '../User';

import './Todo.scss';

export const Todo = ({
  title,
  completed,
  user,
}) => (
  <div className="todo-info">
    <h2>{title}</h2>
    <p>
      <span><b>STATUS: </b></span>
      <span className={classNames({
        'todo-info__completed-todo': completed,
        'todo-info__uncompleted-todo': !completed,
      })}
      >
        {completed ? 'completed' : 'not completed'}
      </span>
    </p>
    <User {...user} />
  </div>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

Todo.defaultProps = {
  completed: false,
};
