import React from 'react';
import { User, UserInfo } from '../UserInfo/UserInfo';

export interface Todo {
  userId: number,
  id: number,
  title: string,
  user?: User | null,
}

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <>
    <p>
      {todo.user && <UserInfo user={todo.user} />}

      <p className="todo-title">
        {todo.title}
      </p>
    </p>
  </>
);
