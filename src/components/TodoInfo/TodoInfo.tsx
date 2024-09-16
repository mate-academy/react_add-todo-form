import { type Todo } from '../../App';
import { UserInfo } from '../UserInfo';
import classNames from 'classnames';

export const TodoInfo: React.FC<{ todo: Todo }> = ({ todo }) => {
  const articleClasses = classNames('TodoInfo', {
    'TodoInfo--completed': todo.completed,
  });

  return (
    <article data-id={todo.id} className={articleClasses}>
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
