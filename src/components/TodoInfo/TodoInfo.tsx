import React from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { TodoWithPerson } from '../../type';

// import { stringify } from "querystring";

type Props = {
  todo: TodoWithPerson;
};

export const TodoInfo:React.FC< Props > = ({
  todo,
}) => {
  return (
    <article
      data-id={todo.id}
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': todo.completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {todo.user && <UserInfo person={todo.user} /> }
    </article>
  );
};
