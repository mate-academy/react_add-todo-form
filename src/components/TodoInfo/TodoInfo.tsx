import React from 'react';
import classNames from 'classnames';
import { ExpandedTodo } from '../../types/ExpandedTodo';

type Props = {
  todo: ExpandedTodo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    userRef,
  } = todo;

  let name = 'unknown User';
  let email;

  if (userRef) {
    name = userRef.name;
    email = userRef.email;
  }

  return (
    <article
      data-id={id}
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <a className="UserInfo" href={`mailto:${email || ''}`}>
        {name}
      </a>
    </article>
  );
};
