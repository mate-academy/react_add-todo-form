import { UserInfo } from '../UserInfo';

type TodoItem = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type UsersItem = {
  id: number;
  name: string;
  username: string;
  email: string;
};

interface TodoListProps {
  todos: TodoItem[];
  users: UsersItem[];
}

export const TodoList: React.FC<TodoListProps> = ({ users, todos }) => {
  return (
    <section className="TodoList">
      {todos.map(item => (
        <article
          key={item.id}
          data-id={item.id}
          className="TodoInfo TodoInfo--completed"
        >
          <h2 className="TodoInfo__title">{item.title}</h2>
          <UserInfo users={users} neededId={item.userId} />
        </article>
      ))}
    </section>
  );
};
