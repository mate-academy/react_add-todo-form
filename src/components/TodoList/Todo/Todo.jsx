import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../../User/User';
import './Todo.scss';

export const Todo = ({ title, completed, userId, user }) => (
  <div className="todo todo--green">
    <div className="todo__content">
      <div className="todo__status">
        {completed
          ? <p className="true">true</p>
          : <p className="false">false</p>
        }
      </div>
      <p className="todo__title">{title}</p>
      <span>
        user id:
        {' '}
        {userId}
      </span>
      <User {...user} />
    </div>
    <div className="todo__close">
      <i className="fas fa-times" />
    </div>
  </div>
);

Todo.propTypes = {
  userId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
