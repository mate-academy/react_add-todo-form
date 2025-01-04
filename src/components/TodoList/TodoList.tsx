import React from 'react';
import { TodoInfo } from '../TodoInfo';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type Props = {
  users: User[];
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ users, todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const user = users.find(user => user.id === todo.userId);

        return (
          <TodoInfo
            key={todo.id}
            todo={todo}
            user={user || { id: 0, name: 'Unknown', username: '', email: '' }}
          />
        );
      })}
    </section>
  );
};
