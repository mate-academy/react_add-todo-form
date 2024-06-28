import { FC } from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';
import { ToDo } from '../../types/types';

interface Props {
  todo: ToDo;
}

export const TodoInfo: FC<Props> = ({ todo }) => (
  <article
    className={`TodoInfo ${cn({ 'TodoInfo--completed': !todo.completed })}`}
    data-id={todo.id}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>
    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
