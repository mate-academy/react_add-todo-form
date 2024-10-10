import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { TodoUser } from '../../types/TodoUser';

interface Props {
  todo: TodoUser;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} key={todo.id} />,
    </article>
  );
};

// TodoInfo TodoInfo--completed
