import React from 'react';
import { TodoAgregate } from '../../types/TodoAgregate';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoAgregate[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
