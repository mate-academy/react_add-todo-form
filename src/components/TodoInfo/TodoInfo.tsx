import cn from 'classnames';

import './TodoInfo.scss';

import { UserInfo } from '../UserInfo';

import { ToDo } from '../../types/ToDo';

type Props = {
  todo: ToDo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    completed,
    user,
    title,
  } = todo;

  return (
    <li
      key={id}
      data-id={id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {
        user && (
          <UserInfo user={user} />
        )
      }
    </li>
  );
};
