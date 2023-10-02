import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../types/todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo
        key={todo.id}
        user={todo.user}
        completed={todo.completed}
        title={todo.title}
      />
    ))}
  </section>
);
