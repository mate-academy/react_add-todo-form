import { ToDo } from '../../types/types';
import { TodoInfo } from '../TodoInfo';

type Prop = {
  todos: ToDo[]
};

export const TodoList:React.FC<Prop> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
