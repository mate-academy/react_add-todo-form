import classNames from 'classnames';
import { Todo } from '../../App';
import { UserInfo } from '../UserInfo';

interface UserTodo {
  userId: number;
  userName: string;
  userEmail: string;
  userLogin: string;
  todoPost: Pick<Todo, 'completed' | 'id' | 'title'>;
}

type Props = {
  todo: Pick<UserTodo, 'userName' | 'userEmail' | 'todoPost'>;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { userName, userEmail, todoPost } = todo;

  return (
    <article
      data-id={todoPost.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todoPost.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todoPost.title}</h2>

      <UserInfo userData={{ userEmail, userName }} />
    </article>
  );
};
