import React from 'react';
import { TodoInterface } from '../../types/Todo';
import { User } from '../../types/User';
import { TodoInfo } from '../TodoInfo';

interface ListProps {
  todos: TodoInterface;
  user: User;
}

export const TodoList: React.FC<ListProps> = ({ todos }) => {
  return (
    <section className="TodosList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} user={user} />
      ))}
    </section>
  );
};
