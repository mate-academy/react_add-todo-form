import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

//         - Коли ви додаєте `Props` до вашого React-компонента (наприклад, у функції),
//        TypeScript буде перевіряти, щоб об'єкт
//        `todo`, переданий в цей компонент, відповідав структурі типу `Todo`.

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed, user } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
