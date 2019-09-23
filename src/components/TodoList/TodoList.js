import React from 'react';
import './TodoList.css';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ todos }) => (
  <ul className="todo-list">
    { todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </ul>
);
  export default TodoList;
