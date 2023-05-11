import { TodoInfo } from '../TodoInfo';
import { User } from '../../types/users';
import { Todo } from '../../types/todo';

type TodoListType = {
  users:User[];
  todos: Todo[];
};

export const TodoList: React.FC<TodoListType> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const userTodos = users.find(user => user.id === todo.userId);

        return (
          <TodoInfo todo={todo} user={userTodos} />
        );
      })}
    </section>
  );
};
