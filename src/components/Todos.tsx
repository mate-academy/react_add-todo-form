import { Todo } from '../types/types';

interface Props {
  todos:Todo[],
}

export const Todos: React.FC<Props> = ({ todos }) => (
  <ul className="App__List">
    {todos.map((todo: Todo) => (
      <li className="App__item">
        {`Task №:${todo.id}, Task:${todo.title}, For userId:${todo.userId}`}
      </li>
    ))}
  </ul>
);
