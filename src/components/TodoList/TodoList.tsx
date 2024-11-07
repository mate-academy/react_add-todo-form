import { Todo } from "../../App";
import { TodoInfo } from "../TodoInfo";

interface TodoListProps {
  todos: Todo[]
}

export const TodoList = ({ todos }: TodoListProps) => {

  return (
    <section className="TodoList">
        {todos.map(todo => (
          <TodoInfo key={todo.id} todo={todo}/>
        ))}
    </section>
  );
};
