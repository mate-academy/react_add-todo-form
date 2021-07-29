import React from 'react';
import classNames from 'classnames';
import { User, prepearedTodosType } from '../UserFolder/User';
import './Todo.css';

export function Todo({ title, completed, user }) {
  const status = completed ? 'Completed' : 'Not completed yet';

  return (
    <>
      <p className="title">
        Todo:
        {' '}
        {title}
      </p>

      <p>
        Status:
        {' '}
        <span
          className={classNames(
            { completed },
          )}
        >
          {status}
        </span>
      </p>

      <User user={user} />
    </>
  );
}

Todo.propTypes = {
  title: prepearedTodosType.title.isRequired,
  completed: prepearedTodosType.completed.isRequired,
  user: prepearedTodosType.user.isRequired,
};
