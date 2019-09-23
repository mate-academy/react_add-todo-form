import React from 'react';
import './TodoItem.css';


const TodoItem = ({ todo }) => {
  const { id, title, user } = todo;
  return (
    <li className="todo-item">
        <p className="todo-item__title"><span className="digit">{id}</span></p>
        <p className="todo-item__main-title">{title}</p>
        <div className="user">
          <p className="user__name">
            {user.name}
          </p>
          <p className="user__email">
            {user.email}
          </p>
          <p className="user__phone">
            {user.phone}
          </p>
          <p className="user__website">
            {user.website}
          </p>
      </div>
    </li>
  )
}

export default TodoItem;
