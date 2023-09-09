import React from 'react';
import classNames from 'classnames';

interface TodoInfoProps {
  id: number;
  title: string;
  completed: boolean;
  userId: number | string;
  userEmail: string | undefined;
  userName: string | undefined;
}

const TodoInfo: React.FC<TodoInfoProps> = ({
  id,
  title,
  completed,
  userId,
  userEmail,
  userName,
}) => {
  return (
    <article
      key={id}
      data-id={id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed === true,
      })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      <a
        key={userId}
        className="UserInfo"
        href={`mailto:${userEmail}`}
      >
        {userName}
      </a>
    </article>
  );
};

export default TodoInfo;
