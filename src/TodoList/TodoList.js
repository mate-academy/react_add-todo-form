import React from 'react';

export const TodoList = ({ todos }) => (
  todos.map(todo => (
    <div key={todo.id} className="todo">
      <p className="todo__item">
            Task
        {' '}
        {todo.taskIndex}
      </p>
      <p className="todo__item">
            UserID:
        {' '}
        {todo.userId}
      </p>
      <p className="todo__item">
            Task:
        {' '}
        {todo.title}
      </p>
    </div>
  ))
);
