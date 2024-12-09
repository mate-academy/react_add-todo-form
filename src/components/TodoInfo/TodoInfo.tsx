import { Todo } from '../../ToDO';
import React from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { User } from '../../User';

type TodoInfoProps = Todo & {
  users: User[];
};

export const TodoInfo: React.FC<TodoInfoProps> = ({
  id,
  title,
  userId,
  completed,
  users,
}) => {
  const user = users.find(u => u.id === userId);

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      <UserInfo {...user} />
    </article>
  );
};
