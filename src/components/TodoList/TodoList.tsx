import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../types/Todo';

export const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => {
  return (
    <>
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </>
  );
};
