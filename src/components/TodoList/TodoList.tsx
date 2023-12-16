import React from 'react';

import { Todo } from '../../react-app-env';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[],
}

export const TodoList: React.FC<Props> = ({
  todos,
}) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => {
        return (
          <TodoInfo todo={todo} key={todo.id} />
        );
      })}
    </section>
  );
};
