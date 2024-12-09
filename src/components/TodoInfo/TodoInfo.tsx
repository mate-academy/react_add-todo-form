import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { TodoWithUser } from '../../types';

export type Props = {
  todo: TodoWithUser;
};

export const TodoInfo = (props: Props) => {
  return (
    <article
      data-id={props.todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': props.todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{props.todo.title}</h2>
      {props.todo.user && <UserInfo user={props.todo.user} />}
    </article>
  );
};
