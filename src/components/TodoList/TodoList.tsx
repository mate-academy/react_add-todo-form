import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { TodoInfo } from '../TodoInfo/TodoInfo';
interface Props {
  todos: Todo[];
  users: User[];
}
export const TodoList: React.FC<Props> = ({ todos = [], users = [] }) => {
  return (
    <div className="TodoList" data-cy="TodoList">
      {todos.map(todo => {
        const currentUser =
          users?.find(user => user.id === todo.userId) || null;

        return <TodoInfo key={todo.id} todo={todo} user={currentUser} />;
      })}
    </div>
  );
};
