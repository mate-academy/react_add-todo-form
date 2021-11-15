import { Todo } from '../types/TodoType';

interface Props {
  todosList: Todo[],
}

export const TodosList: React.FC<Props> = ({ todosList }) => (
  <ul className="App__list">
    {todosList.map((todo: Todo) => (
      <li className="App__item">
        {`Task №:${todo.id}, Task: ${todo.title}, For userId:${todo.userId}`}
      </li>
    ))}
  </ul>
);
