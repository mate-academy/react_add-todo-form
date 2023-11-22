import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { ToDo } from '../../types';

type Props = {
  todos: ToDo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
        />
      ))}
      ;
    </section>
  );
};
