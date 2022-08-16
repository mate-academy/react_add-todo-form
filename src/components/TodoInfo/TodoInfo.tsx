import classNames from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';

interface Props {
  todo: TodoWithUser;
}

export const TodoInfo = (props: Props) => {
  const { todo } = props;

  return (
    <article
      data-id={todo.id}
      className={classNames(
        'TodoInfo', {
          'TodoInfo--completed': todo.completed,
        },
      )}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
