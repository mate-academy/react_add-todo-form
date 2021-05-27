import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User/User';
import './Todo.css';

export const Todo = ({ title, completed, user }) => (
  <div>
    <User {...user} />
    <div className="todoTitleWrapper">
      <p className="todoTitle">
        ●&nbsp;
        {title}
      </p>
    </div>
    <span className="todoStatus">{`Status: ${completed ? '✔' : '✘'}`}</span>
  </div>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
