import React from 'react';
import { Todo } from '../../types/types';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo: Todo, index: number) => {
        return <TodoInfo key={`${todo.id}-${index}`} todo={todo} />;
      })}
    </section>
  );
};
