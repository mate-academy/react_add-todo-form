import React from 'react';
import { Todo } from '../Todo/Todo';
import { TodoListType } from '../../types';

export const TodoList = ({ todos }) => (
  <div>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} />
    ))}
  </div>
);

TodoList.propTypes = TodoListType.isRequired;
