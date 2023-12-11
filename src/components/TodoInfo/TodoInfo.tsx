import { Todo } from '../../Types/Todo';
import users from '../../api/users';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const foundUser = users.find(user => user.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed
    && 'TodoInfo--completed'}`}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {foundUser && <UserInfo user={foundUser} />}
    </article>
  );
};
