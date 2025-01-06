import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todos } from '../../types/Todos';
import { User } from '../../types/User';

export const TodoList: React.FC<Todos> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = users.find(
          (findedUser: User) => findedUser.id === todo.userId,
        );

        if (!user) {
          return;
        }

        return (
          <TodoInfo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            userId={todo.userId}
            user={user}
          />
        );
      })}
    </section>
  );
};
