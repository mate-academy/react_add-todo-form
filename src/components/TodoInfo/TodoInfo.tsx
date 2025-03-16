import { UserInfo } from '../UserInfo';

import { Todo, User } from '../../App';

interface Props {
  todo: Todo;
  users: User[];
}
export const TodoInfo: React.FC<Props> = ({ todo, users }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo userId={todo.userId} users={users} />
    </article>
  );
};
