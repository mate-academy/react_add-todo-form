import React from 'react';
import { Todo, User } from '../../types';
import { TodoInfo } from '../TodoInfo';

interface TodoListProps {
  todos: Todo[];
  getUser?: (id: number) => User | undefined;
}

export const TodoList = ({
  todos,
  getUser = () => undefined,
}: TodoListProps) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} user={getUser(todo.userId)} />
      ))}
    </section>
  );
};
