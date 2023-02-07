import React from 'react';
import { FullTodo } from '../../types/FullTodo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  fullTodos: FullTodo[],
};

export const TodoList: React.FC<Props> = ({ fullTodos }) => {
  return (
    <section className="TodoList">
      {fullTodos.map((fullTodo:FullTodo) => (
        <TodoInfo fullTodo={fullTodo} key={fullTodo.id} />
      ))}
    </section>
  );
};
