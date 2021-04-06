import React from 'react';
import { Todo } from '../Todo';
import { TypeTodoList } from '../../types';
import './TodoList.scss';

export const TodoList = ({ todos }) => (
  <ul className="list">
    {todos.map(todo => (
      <li key={todo.id}>
        <Todo {...todo} />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = TypeTodoList;
