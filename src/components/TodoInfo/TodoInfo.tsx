import { FC } from 'react';
import { TodoWithUser } from '../../Types';
import { UserInfo } from '../UserInfo';

interface Props {
  todoItem: TodoWithUser;
}

export const TodoInfo:FC<Props> = ({ todoItem }) => {
  const { id, title } = todoItem;

  return (
    <article data-id={id} className="TodoInfo TodoInfo--completed">
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo />
    </article>
  );
};
