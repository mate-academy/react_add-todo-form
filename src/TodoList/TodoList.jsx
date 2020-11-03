import React from 'react';

export const TodoList = ({ todos }) => (
  <>
    <h1>Add todo form</h1>
    <ul>
      {todos.map(item => (
        <li key={item.id}>
          {item.title}
          {' '}
          /
          {' '}
          {item.user.name}
          {' '}
          /
          {' '}
          {item.completed ? 'Completed' : 'Not completed'}
        </li>
      ))}
    </ul>
  </>
);
