import React from 'react';
import { Todos } from '../../types.ts/todos';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todos[];
}

export const TodoList: React.FC<Props> = (props) => {
  const { todos } = props;

  return (
    <section className="TodoList">
      {todos.map((todo: Todos) => (
        <TodoInfo
          todo={todo}
          key={todo.id}
        />
      ))}
    </section>
  );
};
