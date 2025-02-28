import { Todo } from './../../types/Todo';

export const TodoInfo = (todo: Todo) => {
  return (
    <div data-id={todo.id}>
      <p>{todo.title}</p>
      <p>{todo.completed ? 'Completed' : 'Not completed'}</p>
      <p>{todo.user?.name}</p>
      <p>{todo.user?.username}</p>
      <p>{todo.user?.email}</p>
    </div>
  );
};
