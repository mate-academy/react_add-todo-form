import { User } from '../../types';
import { Todo } from '../../types';
import { UserInfo } from '../UserInfo';

export const TodoInfo = ({ todo }: { todo: Todo & { user: User } }) => {
  return (
    <article
      data-id={todo.id}
      className={todo.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  );
};


