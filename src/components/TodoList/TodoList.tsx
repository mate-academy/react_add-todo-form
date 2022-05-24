import React from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';
import { PreparedList } from '../../types/PreparedList';
import './TodoList.scss';

type Props = {
  preplist: PreparedList[],
};

export const TodoList: React.FC<Props> = ({ preplist }) => (
  <ul className="list">
    {preplist.map(task => (
      <li
        className={classNames('list__item',
          { 'list__item--done': task.completed })}
        key={task.id}
      >
        <h1>
          <i>Task: </i>
          {task.title}
        </h1>
        {task.user && (<UserInfo user={task.user} />)}
        <h1 className={classNames('list__isComplete',
          { 'list__isComplete--green': task.completed },
          { 'list__isComplete--red': !task.completed })}
        >
          <b>Completed: </b>
          {task.completed ? 'Yes' : 'No'}
        </h1>
      </li>
    ))}
  </ul>
);
