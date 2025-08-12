import usersFromServer from '../../api/users';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = usersFromServer.find(u => u.id === todo.userId);
        const todoWithUser = { ...todo, user };

        return <TodoInfo key={todo.id} todo={todoWithUser} />;
      })}
    </section>
  );
};
