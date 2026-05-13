import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodoUnified } from '../../Types/Unified';

type Props = {
  todos: TodoUnified[];
};

export const TodoList = ({ todos }: Props) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
