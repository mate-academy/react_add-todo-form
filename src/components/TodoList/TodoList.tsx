import { Todo } from '../../api/types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  users: {
    id: number;
    name: string;
    username: string;
    email: string;
  }[];
};

export const TodoList = ({ todos, users = [] }: Props) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = users.find(currentUser => currentUser.id === todo.userId);

        return <TodoInfo key={todo.id} todo={todo} user={user} />;
      })}
    </section>
  );
};
