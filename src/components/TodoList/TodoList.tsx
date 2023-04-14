import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = React.memo(({ todos }) => (
  <section className="TodoList">
    {todos.map(item => (
      <TodoInfo
        key={item.id}
        {...item}
      />
    ))}
  </section>
));
