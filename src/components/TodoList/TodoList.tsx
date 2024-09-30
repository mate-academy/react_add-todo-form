import React from 'react';
import { TodoInfo } from '../TodoInfo';
import users from '../../api/users';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <div>
      {todos.map(todo => {
        const user = users.find(
          (tempUser: { id: number }) => tempUser.id === todo.userId,
        );

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
