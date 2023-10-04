import React from 'react';
import classNames from 'classnames';
import { ToDo } from '../../types/ToDo';
import { UserInfo } from '../UserInfo';

interface Props {
  toDo: ToDo
}

export const TodoInfo: React.FC<Props> = ({ toDo }) => (
  <article
    data-id={toDo.id}
    className={classNames('TodoInfo', {
      'TodoInfo--completed': toDo.completed === true,
    })}
  >
    <h2 className="TodoInfo__title">
      {toDo.title}
    </h2>

    <UserInfo toDo={toDo} />
  </article>
);
