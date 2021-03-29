import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User';

export const Todo = ({
  title,
  user,
  completed,
}) => (
  <>
    <h2>{title}</h2>
    <User {...user} />
    <p>
      Task is
      {completed
        ? (
          <mark
            className="status status--completed"
          >
            completed
          </mark>
        )
        : (
          <mark
            className="status status--not-completed"
          >
            not completed
          </mark>
        )}
    </p>
    {completed ? (
      <i className="todo-list__item-completed" />
    ) : ''
    }
  </>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
  }).isRequired,
  completed: PropTypes.bool.isRequired,
};
