import { TodoInfo } from '../TodoInfo';
import { TodosWithUser, TodoWithUser } from '../../types/generalTypes';

type Props = {
  todos: TodosWithUser;
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos.map((todo: TodoWithUser) => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </>
  );
};
