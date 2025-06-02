import React from 'react';

import { Todo } from '../../entities/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(task => {
        return <TodoInfo key={task.id} todo={task} />;
      })}
    </section>
  );
};
