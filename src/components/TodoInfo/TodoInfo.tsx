import { FC } from 'react';

import { UserInfo } from '../UserInfo';
import { ITodoInfo } from '../../types/ITodoInfo';
import { User } from '../../types/User';

type Props = {
  todo: ITodoInfo;
};

export const TodoInfo: FC<Props> = ({ todo }) => {
  const { title, completed, id, user } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo TodoInfo${completed ? `--completed` : ``}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      <UserInfo user={user as User} />
    </article>
  );
};
