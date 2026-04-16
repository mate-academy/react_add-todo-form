import React from 'react';
import { TodoInfo } from '../TodoInfo';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

type Props = {
  todos: Todo[];
  users?: User[]; // Робимо необов'язковим для гнучкості тестів
};

export const TodoList: React.FC<Props> = ({ todos, users = [] }) => {
  return (
    <>
      {todos.map(todo => {
        // Тепер find не впаде, бо users точно масив (хоча б порожній)
        const user = users.find(u => u.id === todo.userId) || null;

        return <TodoInfo key={todo.id} todo={todo} user={user} />;
      })}
    </>
  );
};
