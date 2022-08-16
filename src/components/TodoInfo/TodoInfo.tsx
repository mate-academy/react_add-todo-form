import classNames from 'classnames';
import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo,
};

export const TodoInfo: FC<Props> = (props) => {
  const { todo } = props;

  return (
    <article
      data-id={todo.id}
      className={classNames(
        'TodoInfo', todo.completed ? 'TodoInfo--completed' : null,
      )}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
