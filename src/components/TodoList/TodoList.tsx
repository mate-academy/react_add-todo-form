import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../Types/Todo';

export const TodoList = ({ todos }: { todos: Todo[] }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);
