import React from 'react';
import { TodoListShape } from '../../shapes/TodoListShape';
import { Todo } from '../Todo';
import './TodoList.scss';

export const TodoList = ({ tasks }) => (
  <div className="todo-container">
    {tasks.map(item => (
      <Todo
        key={item.id}
        name={item.user.name}
        title={item.title}
      />
    ))}
  </div>
);

TodoList.propTypes = TodoListShape;
