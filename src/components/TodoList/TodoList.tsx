import { FC, memo } from 'react';
import { Todo } from '../../types';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';

type Props = {
  todos: Todo[];
};

export const TodoList: FC<Props> = memo(({ todos }) => (
  <ul className="todoList">
    {todos.map(todo => (
      <li
        key={todo.id}
        className="todoList__item"
      >
        <TodoInfo {...todo} />
      </li>
    ))}
  </ul>
));
