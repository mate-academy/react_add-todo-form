import React from 'react';
import { Todowithuser } from '../../types/Todowithuser';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todowithuser[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
