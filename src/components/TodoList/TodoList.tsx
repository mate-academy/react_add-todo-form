import usersFromServer from '../../api/users';
import todosFromServer from '../../api/todos';
import { TodoInfo } from '../../components/TodoInfo';

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
  user: any;
}

interface TodoInfoProps {
  submitted: boolean;
  todos: TodoItem[];
}

export const TodoList = ({ submitted, todos }: TodoInfoProps) => {
  return (
    <section className="TodoList">
      {todosFromServer.map(todo => (
        <TodoInfo
          key={todo.id}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
          user={usersFromServer[todo.userId]}
        />
      ))}
      {!submitted &&
        todos.map(todo => (
          <TodoInfo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            user={todo.user}
          />
        ))}
    </section>
  );
};
