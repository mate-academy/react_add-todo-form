//#region imports
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/todo';
import { User } from '../../types/user';
//#endregion

type Props = {
  todo: Todo;
  user: User;
};

export const TodoInfo: React.FC<Props> = ({ todo, user }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${
        todo.completed === true ? 'TodoInfo--completed' : ''
      }`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={user} />
    </article>
  );
};
