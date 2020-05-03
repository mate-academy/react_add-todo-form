/* eslint-disable react/prop-types */
import React from 'react';
import './ToDoItem.scss';
import User from '../User/User';

const ToDoItem = ({ todo }) => (
  <article className="todo-card">
    <h2>{todo.id}</h2>
    <h2>{todo.title}</h2>
    <h3 className="todo-card__status">{todo.completed ? 'ok' : 'not ok'}</h3>
    <User userInfo={todo} />
  </article>
);

export default ToDoItem;
