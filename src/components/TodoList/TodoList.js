import React from 'react';
import { Todo } from '../Todo';
import { typeTodoList } from '../../propTypes';
import './TodoList.css';

export const TodoList = ({ todos }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <li key={todo.id}>
        <Todo {...todo} />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = typeTodoList;
