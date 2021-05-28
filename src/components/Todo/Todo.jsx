import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { User } from '../User/User';
import './Todo.scss';

export const Todo = ({ title, completed, user }) => (
  <>
    <User {...user} />
    <p className="todo__title">{title}</p>
    <span className={classNames('todo__item', {
      done: completed,
    })}
    >
      { completed ? 'completed' : 'not completed' }
    </span>
  </>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
