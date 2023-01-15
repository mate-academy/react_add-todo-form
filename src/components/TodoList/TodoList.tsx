import React from 'react';

import { TodoInfo } from '../TodoInfo';

import { Todo } from '../../Types';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          todo={todo}
          key={todo.id}
          data-id={todo.id}
        />
      ))}
    </section>
  );
};
