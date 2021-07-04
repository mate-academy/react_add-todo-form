import React from 'react';
import PropTypes from 'prop-types';
import { UserType } from '../typedefs/userType';

const Todo = ({ user, title, completed }) => (
  <li className="todo__item">
    <h2 className="todo__username">
      {user.name}
    </h2>
    <p className="todo__title">
      {title}
    </p>
    {completed
      ? <span className="todo__completed todo__completed--success" />
      : <span className="todo__completed todo__completed--danger" />
    }
  </li>
);

Todo.propTypes = {
  user: UserType.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default Todo;
