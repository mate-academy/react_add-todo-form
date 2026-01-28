import { UserInfo } from '../UserInfo';
import { TodoListProps } from '../../types/Todo';

// type User = {
//   id: number;
//   name: string;
//   username: string;
//   email: string;
// };

// type Todo = {
//   id: number;
//   title: string;
//   completed: boolean;
//   userId: number;
//   user?: User;
// };

// type TodoListProps = {
//   todos: Todo[];
// };

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <UserInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
