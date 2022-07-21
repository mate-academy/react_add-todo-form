import React from 'react';
import { ToDoListWithUser } from '../../Types/ToDoListWidthUser';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  props: ToDoListWithUser[];
};

export const TodoList: React.FC<Props> = ({ props = [] }) => (
  <div className="App__list">
    {props.map(({
      user,
      id,
      title,
      completed,
    }) => {
      return (
        <div className="App__list-card" key={id}>
          <TodoInfo title={title} completed={completed} />
          {user && (
            <UserInfo
              name={user.name}
              email={user.email}
              username={user.username}
            />
          )}
        </div>
      );
    })}
  </div>
);
