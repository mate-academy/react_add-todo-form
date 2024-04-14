import { TodoInfo } from '../TodoInfo';
import { Task } from '../../types/Task';
import React from 'react';

type Props = {
  todos: Task[];
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
