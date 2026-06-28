import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types';

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  const { id, completed, title, user } = todo;

  return (
    <article
      data-id={`${id}`}
      key={id}
      className={classNames(
        `TodoInfo ${completed ? 'TodoInfo--completed' : ''}`,
      )}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
