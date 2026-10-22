import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../App';

interface Props {
  todos: Todo[];
}

export const TodoList = ({ todos }: Props) => (
  <>
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </>
);
