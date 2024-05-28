import React from 'react';
import { UserInfo } from '../UserInfo';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, user, completed = false, title } = todo;

  if (user === null) {
    return;
  } else {
    return (
      <article
        data-id={id}
        key={id}
        className={classNames('TodoInfo', {
          'TodoInfo--completed': completed === true,
        })}
      >
        <h2 className="TodoInfo__title">{title}</h2>

        <UserInfo user={user} />
      </article>
    );
  }
};
