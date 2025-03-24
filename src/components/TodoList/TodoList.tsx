import { TodoInfo } from '../TodoInfo';
import { Todos } from '../../App';
import { Users } from '../../App';

interface Props {
  todos: Todos[];
  users: Users[];
}

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = users.find(person => person.id === todo.userId);

        return (
          <TodoInfo
            key={todo.id}
            todo={todo}
            user={user}
            // onDispaptch={onDispaptch}
          />
        );
      })}
    </section>
  );
};
