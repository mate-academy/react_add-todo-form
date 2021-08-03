import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { User } from '../User';
import allTypes from '../../types';
import './Todo.css';

export const Todo = ({ completed, title, user }) => (
  <div className={classNames(
    'todo-block', {
      doneBlock: completed,
    },
  )}
  >
    <span className={classNames('emptyCheckbox', { done: completed })}>
      {completed ? '☑' : '☐'}
    </span>

    <span>{title}</span>

    <User {...user} />
  </div>
);

Todo.propTypes = {
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  user: allTypes.userType.isRequired,
};
