import React from 'react';
import { TodoWithUser } from '../../interfaces/Todo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: TodoWithUser[];
}

export const TodoList: React.FC<Props> = React.memo(function TodoList({
  todos,
}) {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        return <TodoInfo key={todo.id} todo={todo} />;
      })}
    </section>
  );
});
