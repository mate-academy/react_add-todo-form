import React from 'react';

const TodoList = ({ todos }) => (
  <ul className='ul'>
    {todos.map(todo => (
      <li key={todo.id} className='li'>
        <span>{todo.id}</span>
        <span>{todo.title}</span>
        <span>{todo.completed ? 'done' : 'undone'}</span>
      </li>
    ))}
  </ul>
);

export default TodoList;
