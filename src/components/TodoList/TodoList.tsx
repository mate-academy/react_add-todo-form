import React from 'react';

import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types';

type Props = {
  todos: Todo[];
};
export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList box wrap">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
