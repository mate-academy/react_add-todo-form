import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return (
    <section className="TodoList">
      {
        todos.map(todo => (
          <TodoInfo
            data-id={maxId + 1}
            key={todo.id}
            todo={todo}
          />
        ))
      }
    </section>
  );
};
