import classNames from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo;
};

type Todo = {
  user: User;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
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

      <UserInfo user={user} />
    </article>
  );
};
