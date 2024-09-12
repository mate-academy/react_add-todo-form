import React from 'react';

import { TodoInfo } from '../TodoInfo';
import { TodoUser } from '../../types/TodoUser';

type Props = {
  todos: TodoUser[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
