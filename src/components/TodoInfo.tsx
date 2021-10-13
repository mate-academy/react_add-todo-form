/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import classNames from 'classnames';

interface Props {
  userFullName: string;
  userNickName: string;
  todoTitle: string;
  todoStatus: boolean;
}

export const TodoInfo: React.FC<Props> = ({
  userFullName,
  userNickName,
  todoTitle,
  todoStatus,
}) => {
  return (
    <div className={classNames(
      'box notification',
      (todoStatus ? 'is-success' : 'is-danger'),
    )}
    >
      <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png" alt={`${userFullName} avatar`} />
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <div>
              <strong>{userFullName}</strong>
              <small>{` @${userNickName}`}</small>
              <br />
              <p className="is-size-3">
                {todoTitle}
              </p>
            </div>
          </div>
          <nav className="level is-mobile">
            <div className="level-left">
              <p className="level-item is-size-5">
                {todoStatus ? 'Done' : 'Needs to be done!'}
              </p>
            </div>
          </nav>
        </div>
      </article>
    </div>
  );
};
