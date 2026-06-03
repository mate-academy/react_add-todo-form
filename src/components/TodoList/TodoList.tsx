import { Todo } from '../../types';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todoList?: Todo[];
  todos?: Todo[];
};
export const TodoList = ({ todoList, todos }: Props) => {
  const list = todoList ?? todos ?? [];

  return (
    <>
      {list.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </>
  );
};
