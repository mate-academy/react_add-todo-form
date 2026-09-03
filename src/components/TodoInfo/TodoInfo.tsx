import { UserInfo } from '../UserInfo/UserInfo';
import { Todos } from '../../types/Todos';

type Props = {
  todo: Todos;
};
export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    className={todo.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'}
    data-id={todo.id}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>
    {todo.user ? <UserInfo user={todo.user} /> : null}
  </article>
);
