import classNames from 'classnames';
import React from 'react';
import usersFromServer from '../../api/users';
import { UserInfo } from '../UserInfo';

type Togo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

interface Props {
  todo: Togo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const userFind = usersFromServer.find(person => person.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {userFind && <UserInfo user={userFind} />}
    </article>
  );
};
