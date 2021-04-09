import React from 'react';
import './Todo.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { User } from '../User';

export const Todo = ({ title, completed, user }) => (
  <li className="todo">
    <h3 className="todo__title">{title}</h3>

    <h4 className={classNames(
      'todo__status',
      { 'todo__status_completed': completed }
    )}>
      {completed ? 'Completed' : 'Not completed'}
    </h4>

    User: <User {...user}/>
  </li>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape(
    {
      name: PropTypes.string.isRequired,
    }
  ).isRequired,
}
