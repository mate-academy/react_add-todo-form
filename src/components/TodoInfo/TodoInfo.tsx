import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { TodosWithUsers } from '../../types/TodosWithUsers';

interface Props {
  todo: TodosWithUsers;
}
export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      key={todo.id}
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
