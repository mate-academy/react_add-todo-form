import { ToDo } from '../../types/ToDo';
import cs from 'classnames';
import React from 'react';
import { UserInfo } from '../UserInfo';
import { findUserById } from '../../service/UserService';

type Props = {
  todo: ToDo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cs('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={findUserById(todo.userId)} />
    </article>
  );
};
