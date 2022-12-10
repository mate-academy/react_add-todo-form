import classNames from 'classnames';

import { Todo } from '../../type/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, userId, id } = todo;

  return (
    <article
      data-id={id}
      className={
        classNames('TodoInfo', { 'TodoInfo--completed': false })
      }
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      <UserInfo userId={userId} />
    </article>
  );
};
