import Todo from '../../types/Todo';
import User from '../../types/User';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
  users: User[];
};

export const TodoInfo = ({ todo, users }: Props) => {
  const user = todo.user ?? users?.find(person => person.id === todo.userId);

  return (
    <>
      <article
        data-id={todo.id}
        className={todo.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'}
      >
        <h2 className="TodoInfo__title">{todo.title}</h2>
        {user && <UserInfo user={user} />}
      </article>
    </>
  );
};
