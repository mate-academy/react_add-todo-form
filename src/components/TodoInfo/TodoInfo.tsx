import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { TodosProps } from '../../types/Todo';

export const TodoInfo = ({
  todo,
} : { todo: TodosProps }) => (
  <article
    data-id={16}
    className={classNames('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
  >
    <h2 className={classNames('TodoInfo__title')}>{todo.title}</h2>

    {todo.user && <UserInfo user={todo.user} key={todo.user.id} />}
  </article>
);
