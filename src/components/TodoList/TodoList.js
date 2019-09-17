import React from 'react';
import './TodoList.css'
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ todos }) => (
  <div className="container">
    <div className="todo-list row">
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </div>
  </div>
);

export default TodoList;