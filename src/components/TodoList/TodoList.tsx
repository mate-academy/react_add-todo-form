import React from 'react';
import { Todos } from '../../types/todos';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todos[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
