import { Todo } from '../../types';

type Props = {
  todos: Todo[],
};

export function TodoList(props: Props) {
  const { todos } = props;

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className="todo-list-item">
          <p>
            {todo.title}
          </p>
          <p>
            {todo.user?.name}
          </p>
          <span className="todo-completed">{!todo.completed ? 'completed' : 'not completed'}</span>
        </li>
      ))}
    </ul>
  );
}
