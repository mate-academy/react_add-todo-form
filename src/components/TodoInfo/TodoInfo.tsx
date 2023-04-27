import React from 'react';
import classnames from 'classnames';
import { UserInfo } from '../UserInfo';
import { TodosWithUser } from '../../types/Types';

type Props = {
  todo: TodosWithUser
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;

  return (
    <article
      key={id}
      data-id={id}
      className={classnames('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo user={user} />
    </article>
  );
};
