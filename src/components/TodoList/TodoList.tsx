import React from 'react';
import { TodoInfo } from '../TodoInfo';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Props = {
  todos: Todo[];
  users: User[];
};

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <div>
      {todos.map(todo => {
        const user = users.find(tempUser => tempUser.id === todo.userId);

        if (!user) {
          return null;
        }

        return (
          <TodoInfo
            key={todo.id}
            todo={{
              userId: todo.userId,
              id: todo.id,
              title: todo.title,
              completed: todo.completed,
              user: {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
              },
            }}
          />
        );
      })}
    </div>
  );
};
