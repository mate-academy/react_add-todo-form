import React, { useState } from 'react';
import classNames from 'classnames';
import { Post } from '../../Types/Post';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';
import { User } from '../../Types/User';

type Props = {
  post: Post
};

export const TodoInfo: React.FC<Props> = ({ post }) => {
  const [users] = useState([...usersFromServer]);

  const user = users.find((el: User) => el.id === post.userId);

  return (
    <article
      data-id={post.id}
      className={classNames('TodoInfo',
        { 'TodoInfo--completed': post.completed })}
    >
      <h2 className="TodoInfo__title">
        {post.title}
      </h2>
      {user && <UserInfo user={user} />}

    </article>
  );
};
