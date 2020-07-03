import React from 'react';
import { TodoListShape } from '../Shape';

export const TodoList = ({ todoList, toggle }) => (
  <ul>
    {todoList.map(item => (
      <>
        <input
          id="check"
          type="checkbox"
          onChange={toggle}
          value={item.completed}
        />
        <div className="todo">
          <p>{item.title}</p>
          <p>{item.name}</p>
          <p>
            User ID:
            {item.userId}
          </p>
        </div>
      </>
    ))}
  </ul>
);

TodoList.propTypes = TodoListShape.isRequired;
