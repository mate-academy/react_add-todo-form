import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todos">
    {todos.map(todo => (
      <li key={todo.id} className="todo box">
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
