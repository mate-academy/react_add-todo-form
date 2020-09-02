import React from 'react';
import './TodoList.css';
import { TodoListShape } from '../Shape';

export const TodoList = ({ todos }) => (
  <ul className="todoList">
    {todos.map(todo => (
      <div className="todo">
        <input
          className="todo__checkbox"
          type="checkbox"
          value={todo.completed}
        />
        <div className="todo__text">
          <p>{todo.title}</p>
          <p>{todo.name}</p>
          <p>
            User ID:
            {todo.userId}
          </p>
        </div>
      </div>
    ))}
  </ul>
);

TodoList.propTypes = TodoListShape.isRequired;
