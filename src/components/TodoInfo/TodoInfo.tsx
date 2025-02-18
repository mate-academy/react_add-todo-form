import { UserInfo } from "../UserInfo";
import { Todo } from "../../App";

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo = ({ todo }: TodoInfoProps) => {

  return (
        <article data-id={todo.id} className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}>
          <h2 className="TodoInfo__title">{todo.title}</h2>

        <UserInfo userId ={todo.userId}/>
        </article>
  );
};
