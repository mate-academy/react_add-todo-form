import { Todo } from "../../App";
import { TodoInfo } from "../TodoInfo";

type Props = {
  todos: Todo[];
};

export const TodoList = ({todos}: Props) => {
  return (
    <section className="TodoList">
       {todos.map((todo: Todo) => {
        return (
          <TodoInfo todo = {todo} />
        )
       })}


      </section>
  )
};
