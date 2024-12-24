import { ToDo } from '../../types/types';
import { TodoInfo } from '../TodoInfo';
import React from 'react';

type Props = {
  todos: ToDo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo, indx) => {
        return <TodoInfo key={indx} todo={todo} />;
      })}
    </section>
  );
};
