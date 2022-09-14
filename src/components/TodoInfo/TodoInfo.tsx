import classNames from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';
import { UserWithTodo } from '../../types/UserWithTodo';

type Props = {
  todo: UserWithTodo;
};

export const TodoInfo = (props: Props) => {
  const {
    id,
    completed,
    title,
    user,
  } = props.todo;

  return (
    <article
      data-id={`${id}`}
      className={classNames('TodoInfo', { 'TodoInfo--completed': completed })}
      key={id}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
