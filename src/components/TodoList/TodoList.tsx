import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Task } from '../../types/Task';

type Props = {
  todos: Task[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
