import { TodoInfo } from '../TodoInfo';
import { Todo } from '../TodoInfo/Todo';
import usersFromServer from '../../api/users';

type Props = {
  todos: Omit<Todo, 'user'>[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = usersFromServer.find(u => u.id === todo.userId);

        if (!user) {
          return null;
        }

        return <TodoInfo todo={{ ...todo, user }} key={todo.id} />;
      })}
    </section>
  );
};
