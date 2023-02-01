import { TodoInfo } from '../TodoInfo';

interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
}

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos.map(person => {
        const {
          id,
          title,
          completed,
          userId,
        } = person;

        return (
          <TodoInfo
            key={id}
            id={id}
            title={title}
            completed={completed}
            userId={userId}
          />
        );
      })}
    </>
  );
};
