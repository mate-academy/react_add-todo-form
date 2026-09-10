import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo, User } from '../../types';

type Props = {
  todos: Todo[];
  users: User[];
};

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = users?.find(foundUser => foundUser.id === todo.userId);
        const todoWithUser = { ...todo, user };

        return <TodoInfo key={todo.id} todo={todoWithUser} />;
      })}
    </section>
  );
};
