import { TodoInfo } from '../TodoInfo';

interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

type TodoListProps = {
  todos: Todo[],
  users: User[],
};

export const TodoList: React.FC<TodoListProps> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
          user={users.find(user => user.id === todo.userId)}
        />
      ))}
    </section>
  );
};
