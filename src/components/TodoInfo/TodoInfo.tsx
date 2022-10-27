import { FunctionComponent } from 'react';
import classNames from 'classnames';
import { Todo } from '../../react-app-env';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo
};

export const TodoInfo: FunctionComponent<Props> = ({ todo }) => {
  const {
    title,
    id,
    completed,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
