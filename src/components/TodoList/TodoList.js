import React from 'react';
import './TodoList.css';
import { TodoListShape } from '../Shape';

export const TodoList = ({ todos }) => (
  <ul className="todoList">
    {todos.map((todo, index) => (
      <li className="todo" key={todo.id}>
        <input
          id="check"
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
      </li>
    ))}
  </ul>
);

TodoList.propTypes = TodoListShape.isRequired;
