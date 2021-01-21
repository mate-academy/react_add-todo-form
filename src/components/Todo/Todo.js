import React from 'react';
import classNames from 'classnames';

import { TodoType } from '../../types';
import { User } from '../User';
import './Todo.scss';

export const Todo = (
  {
    title,
    completed,
    user,
  },
) => (
  <div className={classNames('card', { done: completed })}>
    <h2>
      {title}
    </h2>
    <span className={classNames('todotext', { donetext: completed })} />
    <span>
      <User {...user} />
    </span>
  </div>
);

Todo.propTypes = TodoType.isRequired;
