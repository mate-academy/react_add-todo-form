import { TodoInfo } from './TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <>
        <li key={todo.id} className="todoItem">
          <TodoInfo todo={todo} />
        </li>
        <br />
      </>
    ))}
  </ul>
);
