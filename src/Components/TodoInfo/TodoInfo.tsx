import React from 'react';
import { Todo } from '../../types';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = (props) => {
  const { todo } = props;
  const { user, title, completed } = todo;
  const [checked, setChecked] = React.useState(completed);

  return (
    <>
      {user && (
        <UserInfo user={user} />
      )}
      <>
        <div className="todo__title">
          {title}
        </div>
        <div className="todo__status">
          {checked ? 'Completed' : 'In Process'}
        </div>
        <input type="checkbox" onChange={() => setChecked(!checked)} />
      </>
    </>
  );
};
