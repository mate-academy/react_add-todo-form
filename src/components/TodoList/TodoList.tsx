import React from 'react';

import { TodoInfo } from '../TodoInfo';
import { TodoWithUser } from '../../types/TodoWithUser';

type Props = {
  todos: TodoWithUser[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);
