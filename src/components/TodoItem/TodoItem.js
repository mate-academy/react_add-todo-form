import React from 'react';
import PropTypes from 'prop-types';
import User from '../User/User';
import './TodoItem.css';

const TodoItem = ({ todo }) => (
  <li className={todo.completed ? 'card_item green_bg' : 'card_item red_bg'}>
    <div>
      <User data={todo.user} />
    </div>
    <p className="card-text">{todo.title}</p>
  </li>
);

const userShape = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
}).isRequired;

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.shape(userShape),
  }).isRequired,
};

export default TodoItem;
