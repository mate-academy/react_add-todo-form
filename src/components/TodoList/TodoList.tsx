import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';
import './TodoList.scss';

type Props = {
  todos: Todo[];
};

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <ul className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
