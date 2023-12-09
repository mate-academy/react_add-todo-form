import React from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../types/Todo';
import './TodoInfo.scss';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    userId,
  } = todo;

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

      {userId && (
        <UserInfo
          user={userId}
        />
      )}

    </article>
  );
};

/*
export const TodoInfo: React.FC<Props> = ({
  id,
  userId,
  completed,
  title,
})

/*
export const TodoInfo: React.FC<Props> = ({
  id,
  userId,
  completed,
  title,
})

import React from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
};

export const TodoInfo: React.FC<Props> = ({
  id,
  title,
  completed,
  userId,
}) => {
  return (
    <article className={cn('TodoInfo',
      { 'TodoInfo--completed': completed })}
    >

      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {userId && (
        <UserInfo
          user={user}
        />
      )}

    </article>
  );
};
*/
