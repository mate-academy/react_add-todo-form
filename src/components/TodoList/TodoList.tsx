import { TodoInfo } from "../TodoInfo";

type Props = {
  todos: {
    id: number,
    title: string,
    completed: boolean,
    userId: number,
  }[],
}

export const TodoList: React.FC<Props> = ({ todos }) => {

  return (
    <section className="TodoList">

      {
        todos.map(todo => (
          <TodoInfo
            key={todo.id}
            todo={todo}
          />
        ))
      }
    </section>
  )
};
