import { UserInfo } from '../UserInfo';
import { Todo } from '../../types';

export const TodoInfo:React.FC<{ todo:Todo }> = ({ todo }) => (
  <article data-id={todo.id} className={`TodoInfo ${todo.completed && 'TodoInfo--completed'}`}>
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>

    <UserInfo user={todo.user} />
  </article>
);
