import React from 'react';
import { TodoWithUser } from '../../react-app-env';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoWithUser[]
  deleteTodo: (todoId: number) => void
};

export const TodoList: React.FC<Props> = React.memo(({ todos, deleteTodo }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} deleteTodo={deleteTodo} />
      ))}
    </section>
  );
});
