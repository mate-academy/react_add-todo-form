import React from 'react';
import './Todo.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import User from '../User/User';

const Todo = ({ title, completed, user }) => (
  <div className={classNames('todo__item', {
    'todo__item--done': completed,
    'todo__item--undone': !completed,
  })}
  >
    <User {...user} />
    <p>{title}</p>
    <p>{completed ? 'DONE!' : 'in process...'}</p>
  </div>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
export default Todo;
