import { v4 as uuidv4 } from 'uuid';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
}

type Props = {
  todos: Todo[];
};

export const TodoList:React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={uuidv4()} />
      ))}
    </section>
  );
};
