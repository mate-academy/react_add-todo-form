import { FC } from 'react';
import { AllTodo } from '../types';
import { TodoInfo } from './TodoInfo';
import { UserInfo } from '../UserInfo';

type Props = {
  todos: AllTodo[];
};

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <ul className="TodoList">
      {todos.map((todo) => (
        <li key={todo.id} className="TodoItem">
          <TodoInfo {...todo} />
          {todo.user && <UserInfo {...todo.user} />}
        </li>
      ))}
    </ul>
  );
};
