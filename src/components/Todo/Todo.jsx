import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User/User';
import './Todo.scss';

export const Todo = ({ title, completed, user }) => (
  <>
    <User {...user} />
    <span className="item__task">{title}</span>
    <span className={`item__${completed ? 'ready' : 'not-ready'} item__status`}>
      {completed ? 'finished' : 'unfinished'}
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
