import { Todo } from '../../App';
import { UserInfo } from '../UserInfo';
type Props = {
  todo: Todo;
  dataId: number;
};

export const TodoInfo: React.FC<Props> = ({ todo, dataId }) => (
  <article
    className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    data-id={dataId}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>
    <UserInfo user={todo.user} />
  </article>
);
