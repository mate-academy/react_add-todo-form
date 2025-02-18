import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../App';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type EnrichedTodo = Todo & { user: User | undefined };

type Props = {
  todos: EnrichedTodo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo: EnrichedTodo) => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
