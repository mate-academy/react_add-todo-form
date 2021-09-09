import React from 'react';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = {
  todoData: PreparedTodo;
};

export const TodoInfo: React.FC<Props> = (props) => {
  const { todoData } = props;
  const { title, completed, user } = todoData;
  const statusInfo = completed ? 'Completed' : 'Work in progress...';

  return (
    <div className="todoInfo">
      <h2 className="todoInfo__heading">
        {'Task: '}
        {title}
      </h2>
      <p className="todoInfo__status">
        {statusInfo}
      </p>
      <h4 className="todoInfo__responsible"> Resoponsible: </h4>
      { user
        ? <UserInfo person={user} />
        : <p> A user has not been assigned yet </p>}
    </div>
  );
};
