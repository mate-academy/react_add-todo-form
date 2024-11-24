import classNames from 'classnames';
import { Todo } from '../../types/todo';
import usersFromServer from '../../api/users';
import { UserInfo } from '../UserInfo';

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const { id, title, completed, userId } = todo;
  const currentUser = usersFromServer.find(user => user.id === userId);

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {currentUser && <UserInfo user={currentUser} />}
    </article>
  );
};

// <article data-id="1" className="TodoInfo TodoInfo--completed">
//   <h2 className="TodoInfo__title">delectus aut autem</h2>

//   <a className="UserInfo" href="mailto:Sincere@april.biz">
//     Leanne Graham
//   </a>
// </article>;

// if (currentUser) {
//   return (
//     <article
//       data-id={id}
//       className={classNames('TodoInfo', {
//         'TodoInfo--completed': completed,
//       })}
//     >
//       <h2 className="TodoInfo__title">{title}</h2>
//       <a className="UserInfo" href={`mailto:${currentUser?.email}`}>
//         {currentUser?.name}
//       </a>
//     </article>
//   );
// } else {
//   return;
// }

//     <article
//       data-id={id}
//       className={classNames('TodoInfo', {
//         'TodoInfo--completed': completed,
//       })}
//     >
//       <h2 className="TodoInfo__title">{title}</h2>
//       <a className="UserInfo" href={`mailto:${currentUser?.email}`}>
//         {currentUser?.name}
//       </a>
//     </article>
//   );
