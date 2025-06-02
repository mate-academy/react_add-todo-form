import { UserInfo } from '../UserInfo';
import './TodoInfo.scss';
import { TodoWithUser } from '../../entities/TodoWithUser';

interface Props {
  todo: TodoWithUser;
}

export const TodoInfo = ({ todo }: Props) => (
  <article
    className={`TodoInfo${todo.completed ? ' TodoInfo--completed' : ''} `}
    data-id={todo.id}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>
    <UserInfo user={todo.user} key={todo.id} />
  </article>
);
