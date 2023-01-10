import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';
// import { User } from '../../types/User';

// import usersFromServer from '../../api/users';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article data-id="15" className="TodoInfo TodoInfo--completed">
    <h2 className="TodoInfo__title">delectus aut autem</h2>
    {todo.user && (
      <UserInfo user={todo.user} key={todo.userId} />
    )}
  </article>
);
