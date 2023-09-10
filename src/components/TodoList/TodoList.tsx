import TodoInfo from '../TodoInfo/TodoInfo';
import { User, Todo } from '../../types';

interface TodoListProps {
  todos: Todo[];
  users: User[];
}

export default function TodoList({ todos, users }: TodoListProps) {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = users.find(u => u.id === todo.userId);

        return <TodoInfo key={todo.id} todo={todo} user={user} />;
      })}
    </section>
  );
}
