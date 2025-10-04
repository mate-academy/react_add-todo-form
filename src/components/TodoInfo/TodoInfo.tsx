import { UserI } from '../../types/User';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  user: UserI | undefined;
}

export const TodoInfo = ({ todo, user }: Props) => {
  return (
    <>
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <a className="UserInfo" href={user?.email}>
        {user?.name}
      </a>
    </>
  );
};
