import classNames from 'classnames';
import { Todos } from '../../types/Todos';
import { Users } from '../../types/Users';
import UserInfo from '../UserInfo/UserInfo';
import './Todo.css';
import complete from '../../images/complete.svg';
import not_complete from '../../images/not_complete.png';

type Props = {
  todo: Todos;
  user: Users | null;
};

const Todo: React.FC<Props> = ({ todo, user }) => {
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

export default Todo;
