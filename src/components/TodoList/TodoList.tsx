import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodoUser } from '../../types/todo';

type Props = {
  todos: TodoUser[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
