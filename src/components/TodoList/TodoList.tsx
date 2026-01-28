import { TodoInfo } from '../TodoInfo';
import { TodoWithUser } from '../../types';

interface Props {
  todos: TodoWithUser[];
}
export const TodoList = ({ todos }: Props) => {
  return (
    <>
      {todos.map(todo => {
        return <TodoInfo todo={todo} key={todo.id} />;
      })}
    </>
  );
};
