import React, { memo } from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = memo(
  ({ todos }) => {
    return (
      <section className="TodoList">
        {todos.map(todo => (
          <TodoInfo todo={todo} key={todo.id} />
        ))}
      </section>
    );
  },
);
