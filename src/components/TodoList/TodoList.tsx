import { Todo, User, PreparedTodo } from '../../types/types';
import './TodoList.scss';

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
    <div className="todolist">
      {preparedTodos.map((todo: PreparedTodo) => {
        return (
          <div className="todolist__item todo-item">
            <mark className="todo-item__id">{todo.id}</mark>
            <p className="todo-item__title">{todo.title}</p>
            <div className="todo-item__user-info">
              <span>{todo.user.username}</span>
              {'   '}
              <span>{todo.user.email}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
