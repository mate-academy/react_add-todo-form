import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types';
import UserInfo from '../UserInfo/UserInfo';

import './TodoInfo.scss';

type Props = Todo;

const TodoInfo: React.FC<Props> = ({
  title,
  completed,
  user,
}) => (
  <>
    <h3 className={classNames(
      {
        info__completed: completed,
        info__inprogress: !completed,
      },
    )}
    >
      {`${completed ? 'Copmleted' : 'Inprogress'}`}
    </h3>
    <h2 className="todo-info__title">{title}</h2>
    {user && <UserInfo user={user} />}
  </>
);

export default TodoInfo;
