import React from 'react';
import { User, UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user?: User | null;
}

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <>
    <p>
      {todo.user && <UserInfo user={todo.user} />}

      <span className={todo.completed ? 'completed' : 'error'}>
        {todo.title}
      </span>
    </p>
    <br />
  </>
);
