import { Todo } from '../../types';

type Props = {
  todos: Todo[],
};

export function TodoList(props: Props) {
  const { todos } = props;

  return (
    <ul className="p-4 shadow-md rounded-md text-left pt-6 max-w-lg mx-auto flex-col">
      {todos.map(todo => (
        <li key={todo.id} className="shadow mb-2 hover:bg-gray-100">
          <p className="text-lg font-bold">
            {todo.title}
          </p>
          <p className="text-sm">
            {todo.user?.name}
          </p>
        </li>
      ))}
    </ul>
  );
}
