import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User';
import './Todo.scss';

export const Todo = ({ title, completed, user }) => (
  <>
    <div className={completed
      ? 'todo todo--completed'
      : 'todo todo--not-completed'}
    >
      <span className={(completed
        ? 'todo__status todo__status--completed'
        : 'todo__status todo__status--not-completed')}
      >
        {completed ? 'completed' : 'not completed'}
      </span>
      <h3>
        {title}
      </h3>
      <User {...user} />
    </div>
  </>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
