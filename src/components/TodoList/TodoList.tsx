import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  todos?: Todo[];
  users?: User[];
}

export const TodoList: React.FC<Props> = ({ todos = [], users = [] }) => {
  const getUserById = (id: number) => users.find(user => user.id === id);

  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} user={getUserById(todo.userId)} />
      ))}
    </section>
  );
};
