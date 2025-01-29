import classNames from 'classnames';
import { TodoType, UserType } from '../TodoList';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodoType;
  user?: UserType;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    data-id={todo.id}
    key={todo.id}
    className={classNames('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    <UserInfo user={todo.user} />
  </article>
);
