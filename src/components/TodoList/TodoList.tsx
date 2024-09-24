import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todos } from '../typses/Todo';

type Props = {
  todos: Todos[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} data-id={todo.id} />
      ))}
    </section>
  );
};
