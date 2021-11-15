import { Todo, User, PreparedTodo } from '../../types/types';

type Props = {
  users: User[];
  todos: Todo[];
};

const nullUser: User = {
  id: 0,
  name: '',
  username: '',
  email: '',
};

export const TodoList: React.FC<Props> = ({ users, todos }) => {
  const preparedTodos = todos.map((todo: Todo) => {
    return {
      ...todo,
      user: users.find(user => user.id === todo.userId) || nullUser,
    };
  });

  return (
    <div>
      {preparedTodos.map((todo: PreparedTodo) => {
        return (
          <div>
            <mark>{todo.id}</mark>
            <p>{todo.title}</p>
            <div>
              <span>{todo.user.username}</span>
              <span>{todo.user.email}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
