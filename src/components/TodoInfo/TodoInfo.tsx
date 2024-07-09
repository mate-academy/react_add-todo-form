import React from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/types';
import classNames from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const foundUser = usersFromServer.find(user => user.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {foundUser && (
        <a className="UserInfo" href={`mailto:${foundUser.email}`}>
          {foundUser.name}
        </a>
      )}
    </article>
  );
};
// import React from 'react';
// import { UserInfo } from '../UserInfo';
// import { User } from '../../types/types';
// import cn from 'classnames';

// type Props = {
//   id: number;
//   title: string;
//   completed: boolean;
//   user: User;
// };

// export const TodoInfo: React.FC<Props> = ({ id, title, completed, user }) => {
//   return (
//     <article
//       data-id={id}
//       className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
//     >
//       <h2 className="TodoInfo__title">{title}</h2>

//       <UserInfo name={user.name} email={user.email} />
//     </article>
//   );
// };
