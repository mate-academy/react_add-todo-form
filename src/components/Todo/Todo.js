import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User/User';
import './Todo.scss';

export const Todo = ({ title, completed, user, id }) => (
  <label className="todo">
    <span>{id}</span>
    <div className="todo__info">
      <User {...user} />
      <span className="todo__title">
        {title}
      </span>
      <input
        className="todo__checkbox"
        type="checkbox"
        value={completed}
      />
    </div>
  </label>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
