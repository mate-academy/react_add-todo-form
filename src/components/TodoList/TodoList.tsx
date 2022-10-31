import { FC } from 'react';
import { FullTodo } from '../../types/FullTodo';
import { TodoInfo } from '../TodoInfo';
import './TodoList.scss';

type Props = {
  todos: FullTodo[];
};

export const TodoList: FC<Props> = ({ todos }) => (
  <ul className="TodoList">
    {todos.map(todo => (
      <li
        key={todo.id}
      >
        <TodoInfo
          todo={todo}
        />
      </li>
    ))}

  </ul>
);
