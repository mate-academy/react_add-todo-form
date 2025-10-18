import { TodoUser } from '../../types/typeTodoWithUser';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoUser[];
};

export const TodoList = ({ todos }: Props) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const { user, ...todoData } = todo;

        return <TodoInfo key={todoData.id} user={user} todoData={todoData} />;
      })}
    </section>
  );
};
