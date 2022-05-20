import { useState } from 'react';
import { Todo } from '../../types/todo';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <h2 className="title">
        <strong className="title title__strong">
          Todo:
        </strong>
        <br />
        {todo.title}
      </h2>
      <form className="completed">
        <label htmlFor="completed">Completed: </label>
        <input
          type="checkbox"
          id="completed"
          checked={checked}
          onChange={() => {
            setChecked(prev => !prev);
          }}
        />
      </form>
      <p className="user">User info:</p>

      {todo.user && (
        <UserInfo
          name={todo.user.name}
          email={todo.user.email}
        />
      )}
    </>
  );
};
