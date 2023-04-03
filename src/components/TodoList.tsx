import React from 'react';
import { UsersList } from '../types/UserList';
import TodoInfo from './TodoInfo';
import UserInfo from './UserInfo';

type Props = {
  allTodos: UsersList[]
};

const TodoList: React.FC<Props> = ({ allTodos }) => {
  return (
    <>
      {allTodos.map((item, index) => (
        <div
          className="todo-list"
          key={item.id}
        >
          <UserInfo user={item.user} userIndex={index} />
          <TodoInfo userTitle={item.title} />
        </div>
      ))}
    </>
  );
};

export default TodoList;
