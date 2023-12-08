import classNames from 'classnames';
import { Todo } from '../Types/Todo';
import { UserInfo } from '../UserInfo';

export type TodoInfoProps = {
  todo: Todo
};

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  const {
    id, title, completed, user: userInfo,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames(
        'TodoInfo', { 'TodoInfo--completed': completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {userInfo && (
        <UserInfo user={userInfo} />
      )}
    </article>
  );
};
