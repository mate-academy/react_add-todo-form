import React from 'react';
import { Todo } from '../../types/todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

export const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
