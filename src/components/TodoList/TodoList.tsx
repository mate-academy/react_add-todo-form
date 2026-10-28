import React from 'react';
import { ToDosType } from '../../types/TodosType';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: ToDosType[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {[...todos].map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
