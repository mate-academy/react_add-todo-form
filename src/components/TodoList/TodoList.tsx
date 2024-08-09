import React from 'react';
import { TodoExtended } from '../../types/TodoExtended';
import { TodoInfo } from '../TodoInfo';
type Props = {
  todos: TodoExtended[];
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
