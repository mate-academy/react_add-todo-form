import React from 'react';
import classNames from 'classnames';
import './TodoInfo.scss';

type Props = {
  title: string;
  completed: boolean;
};

export const TodoInfo: React.FC<Props> = (({ title, completed }) => (
  <div className="item__task task">
    <div className={classNames('task__status', { 'task__status--completed': completed })} />
    <h1 className="task__title">Task:</h1>
    <p className="task__description">{title}</p>
  </div>
));
