import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { TodoInfo } from '../TodoInfo';

interface TodoListProps {
  todos: Todo[];
  users: User[];
}

export const TodoList = ({ todos, users }: TodoListProps) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = users.find(u => u.id === todo.userId) ?? null;

        return <TodoInfo key={todo.id} todo={{ ...todo, user }} />;
      })}
    </section>
  );
};
