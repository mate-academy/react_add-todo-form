import { FC } from 'react';
import { UserInfo } from '../UserInfo';
import { TodoInfoProps } from './types';

export const TodoInfo: FC<TodoInfoProps> = ({ todo }) => {
  const completedClass = `TodoInfo--completed`;
  const articleClassName = `TodoInfo ${todo.completed && completedClass}`;

  return (
    <article className={articleClassName} data-id={todo.id}>
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
