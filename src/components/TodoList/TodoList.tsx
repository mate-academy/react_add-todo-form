import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  deleteTodo: (todoId: number) => void;
};

export const TodoList: React.FC<Props> = React.memo(({ todos, deleteTodo }) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => (
        <TodoInfo key={todo.id} todo={todo} deleteTodo={deleteTodo} />
      ))}
    </section>
  );
});
