import React from 'react';
import { TodoListShape } from '../Shapes/TodoListShape';

export const TodoList = ({ todos }) => (
  <div className="todo__list">
    {todos.map(todo => (
      <div>
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
