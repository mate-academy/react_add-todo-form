import { TodoInfo } from '../TodoInfo';
import { User, Todo } from '../../App';

interface Props {
  users: User[];
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ users, todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = users.find(u => u.id === todo.userId);

        return user ? <TodoInfo key={todo.id} todo={todo} user={user} /> : null;
      })}
    </section>
  );
};
