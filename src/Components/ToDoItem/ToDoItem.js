import React from 'react';
import './ToDoItem.scss';
import User from '../User/User';

const ToDoItem = ({ todo }) => {
  console.log(todo);

  return (

    <article className="todo-card">
      <h2>{todo.title}</h2>
      <h3 className="todo-card__status">{todo.completed ? 'ok' : 'not ok'}</h3>
      <User userInfo={todo} />
    </article>
  );
};

export default ToDoItem;
