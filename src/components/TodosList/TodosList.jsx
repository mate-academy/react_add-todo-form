import React from 'react';
import './TodosList.scss';

const TodosList = props => (
  <div className="todosList">
    <ul className="post-list">
      {props.todos.map(todo => (
        <li className="post">
          <p className="user-title">{`Title: ${todo.title}`}</p>
          <p className="user-name">{todo.user.name}</p>
          <p className="user-nik">{todo.user.username}</p>
          <p className="user-email">{todo.user.email}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default TodosList;
