import React from 'react';

import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map((todo) => (
      <TodoInfo
        key={todo.id}
        completed={todo.completed}
        title={todo.title}
        todoId={todo.id}
        userId={todo.userId}
      />
    ))}
  </section>
);
