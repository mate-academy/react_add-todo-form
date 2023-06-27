import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodoWithUser } from '../../react-app-env';

type Props = {
  todos: TodoWithUser[];
  deleteTodo: (todoId: number) => void
};

export const TodoList: React.FC<Props> = ({ todos, deleteTodo }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} deleteTodo={deleteTodo} />
    ))}
  </section>
);
