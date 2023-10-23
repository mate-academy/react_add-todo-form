import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    title,
    user,
    completed,
    id,
  } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed && 'TodoInfo--completed'}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user ? <UserInfo user={user} /> : null}
    </article>
  );
};

//  <article data-id="15" className="TodoInfo TodoInfo--completed">
//         <h2 className="TodoInfo__title">delectus aut autem</h2>

//         <a className="UserInfo" href="mailto:Sincere@april.biz">
//           Leanne Graham
//         </a>
//       </article>

//       <article data-id="2" className="TodoInfo">
//         <h2 className="TodoInfo__title">quis ut nam facilis et officia qui</h2>

//         <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
//           Patricia Lebsack
//         </a>
//       </article>
