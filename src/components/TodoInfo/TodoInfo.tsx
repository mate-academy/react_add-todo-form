import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  todoUser: User;
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todoUser, todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      <UserInfo todoUser={todoUser} />
    </article>
  );
};
