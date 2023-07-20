import { TodoInfo } from '../TodoInfo';
import { Todos } from '../index/Todos';

type ArrayOfTodo = Todos[];

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
