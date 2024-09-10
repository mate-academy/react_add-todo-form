import React from 'react';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';
import { Todo } from '../../api/types/Todo'

type TodoProps = {
  todo: Todo;
};

export const TodoInfo: React.FC<TodoProps> = ({ todo }) => {
  const user = usersFromServer.find(user => user.id === todo.userId) || null


  return (
    <article className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`} data-id={todo.id}>
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};

export default TodoInfo;
