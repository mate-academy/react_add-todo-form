import { FC } from 'react';
import { TodoInfo } from '../TodoInfo';
import { ExtendedTodo } from '../../types/ExtendedTodo';

type Props = {
  todos: ExtendedTodo[];
};

export const TodoList: FC<Props> = ({ todos }) => (
  <ul className="TodoList">
    {todos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </ul>
);
