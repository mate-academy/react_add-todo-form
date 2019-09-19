import React from 'react';
import PropTypes from 'prop-types';
import './TodoItem.css';
import User from '../User/User';

function TodoItem({ todo }) {
  const { completed, title, user } = todo;
  const classItem = completed
    ? 'list-group-item li-title disabled'
    : 'list-group-item li-title';

  return (
    <li className={classItem}>
      <span className="li-task">Task:</span>
      {` ${title} | `}
      <User {...user} />
    </li>
  );
}

export default TodoItem;

const todoShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
});

TodoItem.propTypes = {
  todo: todoShape.isRequired,
};
