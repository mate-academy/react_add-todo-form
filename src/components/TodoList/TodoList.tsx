import { FC } from 'react';
import { TodoUser } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';
import './todoList.scss';

interface Props {
  todos: TodoUser[]
}

export const TodoList: FC<Props> = ({ todos }) => (
  <ul className="list">
    {
      todos.map(todo => (
        <li key={todo.id} className="list__item">
          <TodoInfo
            title={todo.title}
            completed={todo.completed}
            user={todo.user}
          />
          {todo.user && (
            <UserInfo
              name={todo.user.name}
              email={todo.user.email}
            />
          )}
        </li>
      ))
    }
  </ul>
);
