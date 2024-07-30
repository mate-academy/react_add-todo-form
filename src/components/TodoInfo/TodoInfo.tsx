import React from 'react';
import { UpdatedTodo } from '../../types/UpdatedTodo';
import classNames from 'classnames';

type Props = {
  data: UpdatedTodo;
};

export const TodoInfo: React.FC<Props> = ({ data }) => {
  return (
    <article
      data-id="1"
      className={`TodoInfo ${classNames({
        'TodoInfo--completed': data.completed,
      })}`}
    >
      <h2 className="TodoInfo__title">{data.title}</h2>
      <a className="UserInfo" href={`mailto:${data.user.email}`}>
        {data.user.name}
      </a>
    </article>
  );
};
