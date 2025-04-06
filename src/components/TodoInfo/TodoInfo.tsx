import React from 'react';
import { UserProps } from '../UserInfo';

export interface TodoProps {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  userObject: UserProps;
}

type Props = {
  todo: TodoProps;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed, userObject } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      <a className="UserInfo" href={`mailto:${userObject.email}`}>
        {userObject.name}
      </a>
    </article>
  );
};
