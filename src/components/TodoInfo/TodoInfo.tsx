import classNames from 'classnames';
import { CompletedTodo } from '../../type';
import { UserInfo } from '../UserInfo';

export const TodoInfo: React.FC<CompletedTodo> = ({ todo, user }) => {
  const { title, id, completed } = todo;

  return (
    <article
      data-id={id}
      className={classNames(
        'TodoInfo',
        {
          'TodoInfo--completed': completed,
        },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      {user && <UserInfo {...user} />}
    </article>
  );
};
