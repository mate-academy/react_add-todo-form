import React from 'react';
import { Todo } from '../../types';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo
        key={todo.id}
        id={todo.id}
        title={todo.title}
        completed={todo.completed}
        user={todo.user}
      />
    ))}
  </section>
);
