import { Todo } from './Todo';
import TodoType from '../Types/Type';

type Props = {
  todos: TodoType[];
};

export const Todolist: React.FC<Props> = ({ todos }) => (
  <ul>
    {todos.map(todo => <Todo {...todo} key={todo.id} />)}
  </ul>
);
