import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todos } from '../../types/todos';

type Props = {
  todos: Todos[]

};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
