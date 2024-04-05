import { TodoInfo } from '../TodoInfo';
import { type Todo } from '../../App';
import React from 'react';

export const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => {
  return (
    <>
      {todos.map((todo: Todo) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </>
  );
};
