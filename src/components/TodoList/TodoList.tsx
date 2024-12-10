import React from 'react';
import { TodosWithUser } from '../../types/TodosWithUser';

import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodosWithUser[];
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
