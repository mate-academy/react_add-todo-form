import React from 'react';
import { Todo } from '../../types/Todos';
import { TodoInfo } from '../TodoInfo';

type Props = { todos: Todo[] };

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(currentTodo => (
      <TodoInfo key={currentTodo.id} todo={currentTodo} />
    ))}
  </section>
);
