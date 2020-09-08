import React from 'react';
import PropTypes from 'prop-types';
import './Todo.scss';
import { User } from '../User/User';

export const Todo = ({ id, title, completed, user }) => (
  <div className="todo">
    <div className="todo__id">
      (id:
      {user.id}
      )
    </div>
    <div className="todo__name"><User {...user} key={user.id} /></div>
    <div className="todo__title">{title}</div>
    <div className="todo__completed">
      {completed
        ? <p className="active">Done</p>
        : <p className="disable">Undone</p>}
    </div>
  </div>
);

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.arrayOf(PropTypes.object).isRequired,
};
