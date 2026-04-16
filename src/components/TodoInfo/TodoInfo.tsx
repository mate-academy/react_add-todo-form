import React, { useEffect, useState } from 'react';
import { UserInfo } from '../UserInfo';

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
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)
      .then(response => response.json())
      .then(data => setUser(data));
  }, [todo.userId]);

  return (
    <div
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
      data-id={todo.id}
    >
      <h3 className="TodoInfo__title">{todo.title}</h3>

      <UserInfo user={user} />
    </div>
  );
};
