import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const { id, title, completed, user } = todo;

        return (
          <TodoInfo
            key={id}
            id={id}
            title={title}
            completed={completed}
            user={user}
          />
        );
      })}
    </section>
  );
};
