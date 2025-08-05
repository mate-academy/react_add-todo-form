import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from './Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed = false, user, userId } = todo;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      <UserInfo user={user} key={userId} />
    </article>
  );
};
