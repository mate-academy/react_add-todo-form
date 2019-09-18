import React from 'react';
import './TodoList.css'
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ preparedTodos }) => (
  <div className="container">
    <div className="todo-list row">
      {preparedTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </div>
  </div>
);

export default TodoList;
