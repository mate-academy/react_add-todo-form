import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User/User';
import './Todo.scss';

export const Todo = ({ title, completed, user, id }) => (
  <div className="todo">
    <span>{id}</span>
    <User {...user} />
    <span>
      {title}
    </span>
    {
      completed
        ? <span className="done">Done</span>
        : <span className="inProgress">In progress</span>
    }
  </div>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
