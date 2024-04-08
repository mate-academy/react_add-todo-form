import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { type Todo } from '../../App';

export const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => {
  return (
    <>
      {todos.map((todo: Todo) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </>
  );
};
