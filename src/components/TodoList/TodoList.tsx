import { TodoInfo } from '../TodoInfo/TodoInfo';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = (props) => {
  const { todos } = props;

  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}

      {/* <article data-id="1" className="TodoInfo TodoInfo--completed">
        <h2 className="TodoInfo__title">
          delectus aut autem
        </h2>

        <a className="UserInfo" href="mailto:Sincere@april.biz">
          Leanne Graham
        </a>
      </article> */}


    </section>
  );
};
