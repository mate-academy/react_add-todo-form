import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

export const TodoList = (props: { todos: Todo[] }) =>
  props.todos.map(todo => <TodoInfo key={todo.id} todo={todo} />);
