import { TodoInfo } from '../TodoInfo';
import { TodoListProps } from '../../types/Types';

export const TodoList = ({ users, todos }: TodoListProps) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const findUser = users.find(user => todo.userId === user.id);

        if (!findUser) {
          return null;
        }

        return <TodoInfo user={findUser} todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
