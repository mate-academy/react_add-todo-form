import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodoAggregate } from '../../types/TodoAggregate';

type Props = {
  todos: TodoAggregate[];
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
