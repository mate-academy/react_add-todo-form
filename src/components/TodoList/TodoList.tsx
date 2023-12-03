import React from 'react';
import { TodoInfo } from '../TodoInfo';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
          userId={todo.userId}
        />
      ))}
    </section>
  );
};
