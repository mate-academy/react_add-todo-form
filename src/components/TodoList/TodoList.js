import React from 'react';
import { TodoListShape } from '../../Shapes';

export const TodoList = ({ todoList, toggle }) => (
  <ul className="todoList">
    {todoList.map(item => (
      <>
        <input
          className="todoList__checkbox"
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
