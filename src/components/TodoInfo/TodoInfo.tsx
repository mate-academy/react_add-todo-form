import { UserInfo } from '../UserInfo';

import { ToDo } from '../../types/todo';

export const TodoInfo = ({ todo }: { todo: ToDo }) => (
  <article
    className={`TodoInfo ${todo.completed === true ? 'TodoInfo--completed' : ''}`}
    data-id={todo.id}
  >
    <h2 className="TodoInfo__title">{`${todo.title}`}</h2>

    <UserInfo user={todo.user} />
  </article>
);
