import React from 'react';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: FullTodo[]
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
