import { TodoInfo } from '../TodoInfo';
type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};
type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};
interface TodoListProps {
  todos: Todo[];
  userList: User[];
}
export const TodoList = ({ todos, userList }: TodoListProps) => {
  const findUser = (id: number) => userList.find(user => user.id === id);
  return (
    <section className="TodoList">
      {todos.map(el => (
        <TodoInfo todo={el} key={el.id} user={findUser(el.userId)} />
      ))}
    </section>
  );
};
