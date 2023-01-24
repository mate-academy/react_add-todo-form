import React, { FC } from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
};

export const TodoList: FC<Props> = React.memo(({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => <TodoInfo key={todo.id} todo={todo} />)}
    </section>
  );
});
