import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { User } from '../User';
import './Todo.scss';

export function Todo({ title, completed, user }) {
  return (
    <div className="todo">
      <h2>{title}</h2>
      <p>
        {`Status: `}
        <span
          className={classNames('todo__status', {
            finished: completed,
          })}
        >
          {completed ? 'Completed' : 'Incompleted'}
        </span>
      </p>
      <User {...user} />
    </div>
  );
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
