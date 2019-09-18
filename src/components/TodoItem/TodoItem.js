import React from 'react';
import User from '../User/User';
import './TodoItem.css';
import { TodoItemPropTypes } from '../../constants/proptypes';

function TodoItem({ todo }) {
  return (
    <li className={!todo.completed ? 'todo-item' : 'todo-item completed'}>
      <div className="drawing-pin">
        <img
          className="drawing-pin__img"
          alt="drawing-pin"
          src="./images/Drawing-Pin.png"
        />
      </div>
      <h1 className="item-title">
        {todo.title}
      </h1>
      <div className="item-user">
        <User user={todo.user} />
      </div>
    </li>
  );
}

TodoItem.propTypes = TodoItemPropTypes;

export default TodoItem;
