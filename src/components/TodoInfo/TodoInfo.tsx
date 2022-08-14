import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import users from '../../api/users';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const chosenUser = users.find(user => user.id === todo.userId) || null;

  return (
    <article
      data-id={todo.id}
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': todo.completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <UserInfo user={chosenUser} />
    </article>
  );
};
