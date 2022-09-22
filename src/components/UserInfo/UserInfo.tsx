import { FC } from 'react';
import usersFromServer from '../../api/users';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface Props {
  todo: Todo,
}

export const UserInfo: FC<Props> = ({ todo }) => {
  const users: User[] = [...usersFromServer];

  return (
    <>
      {users.map(user => (
        user.id === todo.userId
        && (
          <a
            className="UserInfo"
            href={`mailto:${user.email}`}
            key={user.id}
          >
            {user.name}
          </a>
        )
      ))}
    </>
  );
};
