import React from 'react';
import { TodoListShape } from '../Shapes/TodoListShape';
import './TodoList.css';

export const TodoList = ({ todos }) => (
  <div className="todo__list">
    {todos.map(todo => (
      <div className="todo__item">
        <input type="checkbox" />
        <div>
          {todo.title}
        </div>
        <div>
          {` ${todo.user.id}`}
        </div>
      </div>
    ))}
  </div>
);

TodoList.propTypes = TodoListShape.isRequired;

TodoList.defaultProps = {
  todos: [],
  users: [],
};
