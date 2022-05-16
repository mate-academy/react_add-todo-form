import { FC, memo } from 'react';
import { TodoDesc } from '../types/types';
import { TodoInfo } from '../todoInfo/todoInfo';
import './todoList.scss';

type Props = {
  value: TodoDesc[];
};

export const TodoList: FC<Props> = memo(({ value }) => (
  <ul className="todoList">
    {value.map(todo => (
      <li
        className="todoList__item"
        key={todo.id}
      >
        <TodoInfo {...todo} />
      </li>
    ))}
  </ul>
));
