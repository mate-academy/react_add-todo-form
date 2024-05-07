import React from 'react';
import { Todos } from '../Types/todoType';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todos[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(td => (
        <TodoInfo key={td.id} todo={td} />
      ))}
    </section>
  );
};
