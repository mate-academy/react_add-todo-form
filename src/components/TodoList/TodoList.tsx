import { TodoInfo } from '../TodoInfo';

interface User {
  id: number,
  name: string,
  username:string,
  email: string,
}
interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user?: User | null
}

type ArrayOfTodo = Todo[];

type Props = {
  todos: ArrayOfTodo
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <>
    {todos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </>
);
