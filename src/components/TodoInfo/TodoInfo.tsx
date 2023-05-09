import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo
}

export const TodoInfo = ({ todo }: Props) => {
  const {
    id,
    title,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={
        classNames(['TodoInfo', todo.completed && 'TodoInfo--completed'])
      }
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
