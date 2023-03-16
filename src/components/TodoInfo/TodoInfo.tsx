import { FC } from 'react';
import { UserInfo } from '../UserInfo';
import { TodoListType } from '../../Types/Types';

export const TodoInfo: FC<{ todo: TodoListType }> = ({ todo }) => (
  <>
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>

    <UserInfo user={todo.user} />
  </>
);
