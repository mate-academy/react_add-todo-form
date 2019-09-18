import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

const TodoList = ({ todos: copyTodos }) => (
  <div className="container">
    { copyTodos.map(todo => (
      <TodoItem
        todo={todo}
        key={todo.id}
      />
    ))}
  </div>
);

export default TodoList;
