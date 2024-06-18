// import { useState } from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo
};
// Add the required props
export const TodoInfo: React.FC<Props> = ({ todo }) => (
  // const [isCheked, setIsChecked] = useState(false);

  <article className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}>
    <h2 className="TodoInfo__title">{todo.title}</h2>
    <input type="checkbox" checked={todo.completed} />
    {todo.user && (
      <UserInfo user={todo.user} />
    )}
  </article>
);
