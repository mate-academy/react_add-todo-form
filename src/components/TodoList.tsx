import React from 'react';
import { UsersList } from '../types/UserList';
import TodoInfo from './TodoInfo';
import UserInfo from './UserInfo';

type Props = {
  allUsers: UsersList[]
};

const TodoList: React.FC<Props> = ({ allUsers }) => {
  return (
    <>
      {allUsers.map((item, index) => (
        <div
          style={{
            width: '400px',
            border: '1px solid teal',
          }}
          key={item.id}
        >
          <UserInfo
            user={item.user}
            userIndex={index}
          />
          <TodoInfo
            userTitle={item.title}
          />
        </div>
      ))}
    </>
  );
};

export default TodoList;
