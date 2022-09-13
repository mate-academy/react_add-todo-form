import { TodoUser } from '../../react-app-env';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: TodoUser;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <>
    <article
      data-id={todo.id}
      className={`TodoInfo ${(todo.completed) ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title }</h2>
      <UserInfo user={todo.user} />
    </article>
  </>
);
