import ToDo from '../../types/todo';
import User from '../../types/user';
import { TodoInfo } from '../TodoInfo';

interface Props {
  users: User[];
  todos: ToDo[];
}

export const TodoList: React.FC<Props> = ({ users, todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} users={users} todo={todo} />
      ))}
    </section>
  );
};
