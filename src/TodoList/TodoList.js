import React from 'react';

export const TodoList = ({ todos }) => (
  todos.map(todo => (
    <div key={todo.id} className="todo">
      <p>
            Task
        {' '}
        {todo.id}
      </p>
      <p>
            UserID:
        {' '}
        {todo.userId}
      </p>
      <p>
            Task:
        {' '}
        {todo.title}
      </p>
    </div>
  ))
);
