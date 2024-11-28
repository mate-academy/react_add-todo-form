import React from 'react';
import { Todo } from '../../types/Todos';
import { User } from '../../types/Users';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  users: User[];
};

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(({ id, title, userId, completed }) => {
        const currentUser = users.find(user => user.id === userId);

        return (
          <TodoInfo
            key={id}
            id={id}
            title={title}
            userId={userId}
            currentUser={currentUser}
            completed={completed}
          />
        );
      })}
    </section>
  );
};
