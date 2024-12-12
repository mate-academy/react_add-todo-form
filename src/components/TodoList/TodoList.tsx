import React from 'react';

import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  users: User[];
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ users, todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = users.find(theUser => theUser.id === todo.userId);

        return (
          // Використовуємо TodoInfo для відображення кожного завдання
          <TodoInfo key={todo.id} todo={todo} user={user} />
        );
      })}
    </section>
  );
};
