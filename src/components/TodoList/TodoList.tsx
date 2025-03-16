import { User, Todo } from '../../App';
interface Props {
  todos: Todo[];
  users: User[];
}

import { TodoInfo } from '../TodoInfo';

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} users={users} key={todo.id} />
      ))}
    </section>
  );
};
