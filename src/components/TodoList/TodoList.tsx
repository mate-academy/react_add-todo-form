import { FC, memo } from 'react';
import { Todo } from '../../tipes';

import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[],
};

export const TodoList: FC<Props> = memo(({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => {
        return (
          <TodoInfo key={todo.id} todo={todo} />
        );
      })}
    </section>
  );
});
