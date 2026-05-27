// export const TodoInfo = () => {};
import { UserInfo } from '../UserInfo';
import { ToDo } from '../../types/ToDo';
import classNames from 'classnames';
import { getUserById } from '../../functions/getUserId';
import { User } from '../../types/user';

type Props = {
  todo: ToDo;
  user: User;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = getUserById(todo.userId);

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={user} />
      <TodoInfo todo={todo} user={todo.user} key={todo.id} />
    </article>
  );
};
