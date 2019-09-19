import React from 'react';
import PropTypes from 'prop-types';
import './TodoItem.scss';
import User from '../User/User';

const TodoItem = ({
  key, title, completed, user,
}) => (
  <div className="item" key={key}>
    <h2 className="item__title">{title}</h2>
    <p className="item__completed">{completed ? '✔️' : '❌' }</p>
    <User {...user} />
  </div>
);

TodoItem.propTypes = {
  key: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

export default TodoItem;
