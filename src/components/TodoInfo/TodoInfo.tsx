import { FC } from 'react';
import { UserInfo } from '../UserInfo/UserInfo';
import { ToDo } from '../../App';

interface Props {
  todo: ToDo;
}

export const TodoInfo: FC<Props> = ({ todo }) => (
  <article
    className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    data-id={todo.id}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>
    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
