import React from 'react';
import PropTypes from 'prop-types';
import './Todo.scss';
import { User } from '../User';
import { UserType } from '../../types';

export function Todo({ title, completed, user }) {
  return (
    <div className="task">
      <h2 className="task__title">{title}</h2>
      <p className="task__state">{completed ? 'done' : 'didn\'t finish'}</p>
      <User user={user} />
    </div>
  );
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: UserType.isRequired,
};
