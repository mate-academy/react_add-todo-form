import { TodoInfo } from '../TodoInfo';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type Props = {
  todosOnList: Todo[];
};

export const TodoList: React.FC<Props> = ({ todosOnList }) => {
  return (
    <section className="TodoList">
      {todosOnList.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
