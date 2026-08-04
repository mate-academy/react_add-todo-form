import { Todo } from '../../App';
import { TodoInfo } from '../TodoInfo';
export const TodoList = ({ todos }: { todos: Todo[] }) => <section className="TodoList">{todos.map(todo => <TodoInfo key={todo.id} todo={todo} />)}</section>;
