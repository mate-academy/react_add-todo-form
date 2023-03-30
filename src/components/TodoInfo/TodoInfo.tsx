import classNames from 'classnames';
import React from 'react';
import { FullTodo } from '../../types/FullTodo';
import { UserInfo } from '../UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: FullTodo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    title,
    user,
    id,
    completed,
  } = todo;

  return (
    <article
      data-id={id}
      className={
        classNames('TodoInfo', { 'TodoInfo--completed': completed })
      }
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {
        user && (
          <UserInfo user={user} />
        )
      }
    </article>
  );
};
