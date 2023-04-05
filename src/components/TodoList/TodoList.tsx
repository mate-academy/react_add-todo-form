import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todos } from '../../types/Todos';

type Props = {
  todolist: Todos[],
};

export const TodoList: React.FC<Props> = ({ todolist }) => {
  return (
    <section className="TodoList">
      {todolist.map((todo: Todos) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
