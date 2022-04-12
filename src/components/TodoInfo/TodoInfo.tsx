import { FC } from 'react';
import { FullTodo } from '../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

interface Props {
  todo: FullTodo;
}

export const TodoInfo: FC<Props> = ({ todo }) => (
  <div className="todo_info">
    <h2 className="todo_title">{todo.title}</h2>
    <p className="todo_checed">{todo.completed ? 'Complited' : 'Not Complited'}</p>
    <div>
      {todo.user && <UserInfo user={todo.user} />}
    </div>
  </div>
);
