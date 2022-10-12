import { FC } from 'react';
import { Todo } from '../../react-app-env';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[]
}

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <ul className="TodoList">
      {todos.map(todo => <TodoInfo todo={todo} key={todo.id} />)}
    </ul>
  );
};
