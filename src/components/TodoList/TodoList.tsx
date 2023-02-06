import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todoData: Todo[]
};

export const TodoList: React.FC<Props> = ({ todoData }) => {
  return (
    <section className="TodoList">
      {todoData.map((todo) => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
