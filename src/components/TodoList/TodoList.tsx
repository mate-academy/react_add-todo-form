import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { PrepareTodo } from '../types';

type Props = {
  todos: PrepareTodo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo: PrepareTodo) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
