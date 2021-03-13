import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Todo.css';
import { UserType } from '../../types';
import { User } from '../User';

export function Todo({ title, completed, user }) {
  return (
    <p className="todo">
      <span className="todo__title">
        {`${title[0].toUpperCase() + title.slice(1)} - `}
        <span
          className={classNames({
            todo__completed: completed,
            todo__uncompleted: !completed,
          })}
        >
          {`${completed ? '✔' : '✘'}`}
        </span>
      </span>
      <br />
      <User user={user} />
    </p>
  );
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: UserType.isRequired,
};
