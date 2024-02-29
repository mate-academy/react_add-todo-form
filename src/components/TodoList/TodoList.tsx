import { TodoInfo } from '../TodoInfo';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
