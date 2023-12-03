import classNames from 'classnames';
import { Todo } from '../../types/todo';
import { UserInfo } from '../UserInfo';

export type TodoInfoProps = {
  todo: Todo
};

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  const {
    id, title, completed, user,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames(
        'TodoInfo', completed && 'TodoInfo--completed',
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && (
        <UserInfo user={user} />
      )}
    </article>
  );
};

// "TodoInfo TodoInfo--completed"
