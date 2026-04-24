import { Todo, User } from '../../types/types';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  users?: User[];
};

export const TodoList: React.FC<Props> = ({ todos, users = [] }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = users.find(u => u.id === todo.userId);

        return <TodoInfo key={todo.id} todo={{ ...todo, user }} />;
      })}
    </section>
  );
};
