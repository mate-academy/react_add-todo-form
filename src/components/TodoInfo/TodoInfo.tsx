import React from 'react';
import cn from 'classnames';
import './TodoInfo.scss';
import { Todo } from '../../Types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo,
};
export const TodoInfo:React.FC<Props> = ({ todo }) => {
  const { title, completed, user } = todo;

  return (
    <article
      data-id="1"
      className={
        cn('TodoInfo', {
          'TodoInfo--completed': completed,
        })
      }
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && (
        <UserInfo user={user} />
      )}
    </article>
  );
};
