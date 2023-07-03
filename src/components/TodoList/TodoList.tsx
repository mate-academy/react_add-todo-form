import React from 'react';
import { TodoInterface } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoInterface[],
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
