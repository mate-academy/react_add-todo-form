import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Users } from '../../types/Users';
import UserInfo from '../UserInfo/UserInfo';
import './TodoItem.css';
import complete from '../../images/complete.svg';
import not_complete from '../../images/not_complete.png';

type Props = {
  todo: Todo;
  user: Users | null;
};

const TodoItem: React.FC<Props> = ({ todo, user }) => {
  return (
    <>
      <div
        className={classNames(
          'todo',
          {
            completed: todo.completed,
          },
        )}
      >
        <h3>{todo.title}</h3>
        <div className="todo__container">
          <p>{todo.completed ? 'Completed' : 'Not completed'}</p>
          <img
            className="todo__image"
            src={todo.completed ? complete : not_complete}
            alt="logo"
          />
        </div>
        {user ? <UserInfo user={user} /> : <p>User not found</p>}
      </div>
    </>
  );
};

export default TodoItem;
