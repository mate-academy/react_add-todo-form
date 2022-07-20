import React from 'react';
import { User } from '../UserInfo/UserInfo';

export interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user?: User | null,
}

type Props = {
  title: string,
  completed: boolean,
};

export const TodoInfo: React.FC<Props> = ({ title, completed }) => (
  <>
    <h2 data-cy="title">{title}</h2>
    <p data-cy="status">{completed ? 'Done' : 'In process'}</p>
  </>
);
