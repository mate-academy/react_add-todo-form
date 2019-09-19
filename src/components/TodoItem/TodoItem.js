import React from 'react';
// import { TodoItemProps } from '../constants/PropTypes';
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

// TodoItem.propTypes = TodoItemProps;

export default TodoItem;
