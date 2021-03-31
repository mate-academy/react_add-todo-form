import React from 'react';
import { Todo } from '../Todo';
import { TypeTodoList } from '../../types';
import './TodoList.scss';

export const TodoList = ({ todos }) => (
  <>
    {todos.map(todo => (
      <li key={todo.id}>
        <Todo {...todo} />
      </li>
    ))}
  </>
);

TodoList.propTypes = TypeTodoList;
