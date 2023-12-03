import React from 'react';

import usersFromServer from '../../api/users';

type Props = {
  title: string,
  completed: boolean,
  id: number,
  userId: number,
};

export const TodoInfo: React.FC<Props> = ({
  title, completed, id, userId,
}) => {
  const user = usersFromServer.find(u => u.id === userId);

  return (
    <article data-id={id} className={`TodoInfo ${completed && 'TodoInfo--completed'}`}>
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <a className="UserInfo" href={`mailto:${user?.email}`}>
        {user?.name}
      </a>
    </article>
  );
};
