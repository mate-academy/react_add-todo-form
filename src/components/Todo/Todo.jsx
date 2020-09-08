import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { User } from '../User';

export const Todo = ({ title, completed, user }) => (
  <>
    <p className="todo__title">{title}</p>
    <p className={classNames({
      todo__status: true,
      'todo__status--completed': !completed,
    })}
    >
      {completed ? 'Completed' : 'In progress'}
    </p>
    <User {...user} />
  </>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
};

Todo.defaultProps = {
  user: {},
};
