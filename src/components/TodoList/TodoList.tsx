import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todoinfo: Todo) => {
        return <TodoInfo key={todoinfo.id} todo={todoinfo} />;
      })}
    </section>
  );
};
