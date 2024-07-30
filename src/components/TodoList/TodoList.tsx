import React from 'react';
import { UpdatedTodo } from '../../types/UpdatedTodo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  data: UpdatedTodo[];
};

export const TodoList: React.FC<Props> = ({ data }) => {
  return (
    <section className="TodoList">
      {data.map(el => {
        return <TodoInfo key={el.id} data={el} />;
      })}
    </section>
  );
};
