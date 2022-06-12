import React from 'react';
import './TodoInfo.scss';
import classNames from 'classnames';

import { ToDo } from '../../interfaces/ToDo';
import { UserInfo } from '../UserInfo';

interface Props {
  card: ToDo,
}

export const TodoInfo: React.FC<Props> = ({ card }) => (
  <>
    <div className={classNames('todo-card',
      { 'todo-card__done': card.completed === true })}
    >
      <div className="todo-title">
        <p>
          Title:&#160;&#160;
          {card.title}
        </p>
      </div>
      <div>
        Responsible person:&#160;
        <br />
      </div>
      <div className="todo-person">
        <p>
          {card.User ? (
            <UserInfo user={card.User} />
          ) : 'user not assigned'}
        </p>
      </div>
      <div>
        {'Task ID: '}
        {card.id}
      </div>
      <p>
        status:&#160;
        {card.completed ? 'Done' : 'Undone'}
      </p>
    </div>
  </>
);
