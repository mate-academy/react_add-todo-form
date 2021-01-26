import React from 'react';
import PropTypes from 'prop-types';

import './Todo.scss';
import { UserType } from '../../types';
import { User } from '../User/User';

export const Todo = ({ todo }) => (
  <div className="Todo">
    <div className="Todo__info">
      <span className="Todo__title">{todo.title}</span>
      { todo.completed
        ? <div className="Todo__process">done</div>
        : <div className="Todo__process--not">not</div>
      }
    </div>

    <User user={todo.user} />
  </div>
);

Todo.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: UserType.isRequired,
  }).isRequired,
};
