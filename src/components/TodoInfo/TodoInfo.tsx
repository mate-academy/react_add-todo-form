import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { TodosProps } from '../../types/Todo';

export const TodoInfo = ({ todo }: { todo: TodosProps }) => {
  const { completed, title, user} = todo;

  return (
  <article
    data-id={16}
    className={classNames('TodoInfo', {
      'TodoInfo--completed': completed,
    })}
  >
    <h2 className={classNames('TodoInfo__title')}>{title}</h2>

    {user && <UserInfo user={user} key={user.id} />}
  </article>
)};
