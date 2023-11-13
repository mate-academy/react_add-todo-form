import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todos } from '../../types/Todos';

type Props = {
  todos: Todos[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo: Todos) => (
        <TodoInfo todo={todo} key={`${todo.title}--todo`} />
      ))}
    </section>
  );
};
