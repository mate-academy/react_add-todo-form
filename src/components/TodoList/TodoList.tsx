import React from 'react';
import { TodoExtanded } from '../../types/TodoExtandes';
import { TodoInfo } from '../TodoInfo';
type Props = {
  todos: TodoExtanded[];
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
