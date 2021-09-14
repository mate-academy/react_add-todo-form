import { FC } from 'react';

type Props = {
  todos: Todo[];
};

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <>
      {todos.map(todo => (
        <li
          key={todo.id}
          className="list-group-item"
        >
          {todo.title}
        </li>
      ))}
    </>
  );
};
