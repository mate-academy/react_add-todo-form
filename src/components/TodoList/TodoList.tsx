import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../types/todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(({
      id,
      user,
      completed,
      title,
    }: Todo) => (
      <TodoInfo
        key={id}
        user={user}
        completed={completed}
        title={title}
      />
    ))}
  </section>
);
