import { Todo } from '../../type/todo';
import { User } from '../../type/user';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo,
  users: Array<User>
  maxId: number
};

export const TodoInfo = ({ todo, users, maxId }: Props) => {
  return (
    <article
      data-id={maxId}
      className={todo.completed
        ? 'TodoInfo TodoInfo--completed'
        : 'TodoInfo'}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      <UserInfo todo={todo} users={users} />
    </article>
  );
};
