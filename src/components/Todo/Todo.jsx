import React from 'react';
import classNames from 'classnames';
import './Todo.scss';
import { User } from '../User/User';
import { TodoType } from '../../types';

export const Todo = ({
  title,
  completed,
  user,
}) => (
  <div className="todo-card">
    <div className="todo-card__title">
      {title}
    </div>
    <div className="todo-card__user">
      <User user={user} />
    </div>
    <div className={
      classNames('todo-card__status', {
        completed,
        uncompleted: !completed,
      })
    }
    >
      {completed ? 'Finished' : 'Unfinished'}
    </div>
  </div>
);

Todo.propTypes = TodoType.isRequired;
