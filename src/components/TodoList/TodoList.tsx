import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { ITodosWithUsers } from '../../components/types/data.interface';

type Props = {
  renderedData: ITodosWithUsers[];
};

export const TodoList: React.FC<Props> = ({ renderedData }) => {
  return (
    <section className="TodoList">
      {renderedData.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
