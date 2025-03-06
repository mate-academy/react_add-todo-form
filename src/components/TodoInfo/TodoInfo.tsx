import { FC } from 'react';
import classNames from 'classnames';
import { TodoInfo as TodoInfoType } from '../../types';
import { UserInfo } from '../UserInfo';
import users from '../../api/users';

type TodoInfoPropsType = {
  todo: TodoInfoType;
};
export const TodoInfo: FC<TodoInfoPropsType> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames({
        TodoInfo: true,
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={users?.find(item => item.id === todo.userId)} />
    </article>
  );
};
