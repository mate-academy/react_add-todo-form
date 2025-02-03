import React from 'react';
import { TodoInfo } from '../TodoInfo';

import { USERTODO } from '../../types/UserTodo';

type Props = {
  todos: USERTODO[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
