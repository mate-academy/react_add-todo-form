import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = (props: Props) => {
  const { todo } = props;
  const { id, completed, title, user } = todo;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', completed && 'TodoInfo--completed')}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
