import React from 'react';
import ClassNames from 'classnames';
import { TodoWidthUser } from '../../react-app-env';
import './TodoList.scss';

type Props = {
  todosWidthUser: TodoWidthUser[];
};

export const TodoList: React.FC<Props> = ({ todosWidthUser }) => (
  <ul className="list list__wrapper">
    {todosWidthUser.map((todo) => {
      const {
        id,
        title,
        completed,
        user,
      } = todo;

      const getColorToStatus = () => (
        ClassNames(
          'subtitle is-5 list__item-status',
          {
            'list__item-status--done': completed,
          },
        )
      );

      const doneMessage: string = completed
        ? 'Task Completed'
        : 'Task Not Completed';

      return (
        <li className="card list__item" key={id}>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="subtitle is-4">{`Name: ${user?.name}`}</p>
                <p className="title is-3">{`Title: ${title}`}</p>
                <p className={getColorToStatus()}>{`Status: ${doneMessage}`}</p>
              </div>
            </div>

            <div className="content card">
              <div className="card-content list__userContactWrapper">
                <span className="list__userContact">{`Email: ${user?.email}`}</span>
                <span className="list__userContact">{`Phone: ${user?.phone}`}</span>
                <span className="list__userContact">{`Website: ${user?.website}`}</span>
              </div>
            </div>
          </div>
        </li>
      );
    })}
  </ul>
);
