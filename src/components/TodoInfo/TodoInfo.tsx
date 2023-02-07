import React from 'react';
import './TodoInfo.scss';
import classNames from 'classnames';
import { Todo } from '../Type/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    completed,
    title,
    user,
    id,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames(
        'TodoInfo',
        {
          'TodoInfo--completet': completed,
        },
      )}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {
        user && <UserInfo user={user} />
      }
    </article>
  );
};
