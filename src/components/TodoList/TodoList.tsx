import usersFromServer from '../../api/users';
import todosFromServer from '../../api/todos';
import { TodoInfo } from '../../components/TodoInfo';
import { TodoListProps } from '../../types';

export const TodoList = ({ submitted, todos }: TodoListProps) => {
  return (
    <section className="TodoList">
      {todosFromServer.map(todo => (
        <TodoInfo
          key={todo.id}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
          user={usersFromServer[todo.userId]}
          todos={todos}
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
            todos={todos}
          />
        ))}
    </section>
  );
};
