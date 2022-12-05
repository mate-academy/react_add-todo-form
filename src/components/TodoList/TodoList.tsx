import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  visibleTodos: Todo[]
};

export const TodoList: React.FC<Props> = ({ visibleTodos }) => {
  return (
    <section className="TodoList">
      {visibleTodos.map(todo => {
        return (
          <TodoInfo key={todo.id} todo={todo} />
        );
      })}
    </section>
  );
};
