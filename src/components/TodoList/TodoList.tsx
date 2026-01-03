//#region imports
import { Todo } from '../../types/todo';
import { User } from '../../types/user';
import { TodoInfo } from '../TodoInfo';
//#endregion

type Props = {
  todos: Todo[];
  users: User[];
};

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
          user={users.find(u => u.id === todo.user.id)!}
        />
      ))}
    </section>
  );
};
