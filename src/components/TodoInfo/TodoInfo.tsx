import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
// import usersFromServer from '../../api/users';
import { TodosList } from '../../types/TodoList';
// import { User } from '../../types/User';

type Props = {
  todo: TodosList,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  // const found = (userId:number) => {
  //   return usersFromServer.find(user => user.id === userId)
  //   || usersFromServer[0];
  // };

  // console.log('info', userInfo);

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo',
        {
          'TodoInfo--completed': todo.completed,
        })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      <UserInfo user={todo.user} />
    </article>
  );
};
