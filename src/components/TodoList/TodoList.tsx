import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo[];
}
export const TodoList: React.FC<Props> = props => {
  const { todo } = props;

  return (
    <section className="TodoList">
      {todo.map(currTodo => (
        <article
          data-id="1"
          className="TodoInfo TodoInfo--completed"
          key={currTodo.id}
        >
          <h2 className="TodoInfo__title">{currTodo.title}</h2>

          {/* <a className="UserInfo" href="mailto:Sincere@april.biz">
            Leanne Graham
          </a> */}
          <UserInfo user={currTodo.user} />
        </article>
      ))}
    </section>
  );
};
