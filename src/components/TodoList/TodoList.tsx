import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { PreparedTodo } from '../../types/types';

type Props = {
  todos: PreparedTodo[];
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
