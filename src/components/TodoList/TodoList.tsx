import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todos } from '../../Types/Types';

export const TodoList: React.FC<Todos> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} data-id={todo.id} key={todo.id} />
      ))}
    </section>
  );
};
