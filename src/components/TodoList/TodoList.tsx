import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';
import { User } from '../../types/User';

interface TodoListProps {
  todos: Todo[];
  users: User[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const theUser = users.find(user => user.id === todo.userId);

        if (!theUser) {
          return;
        }

        const todoWithUser = {
          ...todo,
          user: theUser,
        };

        return <TodoInfo todo={todoWithUser} key={todo.id} />;
      })}
    </section>
  );
};
