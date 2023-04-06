import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todolist: Todo[],
};

export const TodoList: React.FC<Props> = ({ todolist }) => {
  return (
    <section className="TodoList">
      {todolist.map((todo: Todo) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
