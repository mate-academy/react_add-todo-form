import { TodoInfo } from '../TodoInfo';

interface TodosList {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

type Props = {
  todos: TodosList[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => (
        <TodoInfo
          todo={todo}
          key={todo.id}
        />
      ))}
    </section>
  );
};
