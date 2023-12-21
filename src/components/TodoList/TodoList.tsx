import { Todo } from '../../type/todo';
import { TodoInfo } from '../TodoInfo';
import { User } from '../../type/user';

type Props = {
  toDoLists: Todo[];
  findUser: (id: number) => User | undefined;
};

export const ToDoList: React.FC<Props> = ({ toDoLists, findUser }) => {
  return (
    <section className="TodoList">
      {toDoLists.map((todo) => (
        <TodoInfo
          todo={todo}
          findUser={findUser}
          key={todo.id}
        />
      ))}
    </section>
  );
};
