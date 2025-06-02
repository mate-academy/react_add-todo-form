import { TodoInfo } from '../TodoInfo';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
export interface TodoWithUser extends Todo {
  user: {
    id: number;
    name: string;
    email: string;
  };
}
interface Props {
  todos: TodoWithUser[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        return <TodoInfo key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
