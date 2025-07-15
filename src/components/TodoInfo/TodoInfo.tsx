import users from '../../api/users';
import { UserInfo } from '../UserInfo';
import { Task } from '../../types/Task';
import classNames from 'classnames';

export const TodoInfo = ({ todo }: { todo: Task }) => {
  const user = users.find(el => el.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo block', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2
        className={`TodoInfo__title ${todo.completed ? 'has-text-success' : 'has-text-info'}`}
      >
        <span
          className={`fa-regular fa-small mr-2 ${todo.completed ? 'fa-square-check' : 'fa-square'}`}
        ></span>
        {todo.title}
      </h2>
      <UserInfo user={user} />
    </article>
  );
};
