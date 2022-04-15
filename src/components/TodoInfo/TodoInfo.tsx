import React from 'react';
import { User } from '../../interfaces/interface';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = {
  title: string,
  completed: boolean,
  user: User | null,
  todoId: number,
};

export const TodoInfo: React.FC<Props> = ({
  title,
  completed,
  user,
  todoId,
}) => (
  <>
    <h2
      className="title"
    >
      Title:
      {' '}
      {title}
    </h2>
    <p
      className="parag"
    >
      {'ToDo ID: '}
      {todoId}
    </p>

    <p
      className="description"
      style={{
        color: completed ? 'green' : 'red',
      }}
    >
      <b>
        {'Completed: '}
      </b>
      {completed ? 'YES' : 'NO'}
    </p>
    {user && (
      <UserInfo
        name={user.name}
        email={user.email}
        userId={user.id}
      />
    )}
  </>
);
