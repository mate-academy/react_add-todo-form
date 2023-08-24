import { Todo } from '../../types/index';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={todo.completed
      ? 'TodoInfo TodoInfo--completed'
      : 'TodoInfo'}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>
    {todo.user && (<UserInfo user={todo.user} />)}
  </article>
);
