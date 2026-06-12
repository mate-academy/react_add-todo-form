import { TodoInfo } from '../TodoInfo';
import { Todo, User } from '../types';

type Props = {
  todos: Todo[];
  users?: User[];
};

export const TodoList: React.FC<Props> = ({ todos, users = [] }) => {
  return (
    <section className="TodoList">
      {todos.map(item => {
        const user = users.find(el => el.id === item.userId);

        return <TodoInfo key={item.id} todo={item} user={user} />;
      })}
    </section>
  );
};
