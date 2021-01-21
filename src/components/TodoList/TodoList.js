import React from 'react';
import { Todo } from '../Todo';
import { TodoListType } from '../../types';

export function TodoList({ todos }) {
  return (
    <ul className="to-do">
      {todos.map(todo => <Todo {...todo} key={todo.id} />)}
    </ul>
  );
}

TodoList.propTypes = TodoListType;
