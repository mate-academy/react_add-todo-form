import React from 'react';
import cn from 'classnames';

import { UserInfo } from '../UserInfo';
import { Post } from '../../types/Post';

type Props = {
  todo: Post
};

export const TodoInfo: React.FC<Props> = ({
  todo: {
    id,
    completed,
    title,
    user,
  },
}) => {
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo user={user} />
    </article>
  );
};
