import React from 'react';

export const ToDoList = ({ todolist }) => (
  todolist.map(todo => (
    <ul key={todo.id} className="list">
      <li>
        <span className="description">ToDo ID: </span>
        {todo.id}
      </li>
      <li>
        <span className="description">User ID: </span>
        {todo.userId}
      </li>
      <li>
        <span className="description">Task: </span>
        {todo.title}
      </li>
    </ul>
  ))
);
