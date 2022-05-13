import { FC } from 'react';
import { LinkedTodo } from '../../typedef';
import { TodoCard } from '../TodoCard';

import './TodoList.scss';

type Props = {
  todos: LinkedTodo[];
};

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <ul className="TodoList">
      {
        todos.map((todo) => {
          const {
            id,
            title,
            completed,
            userName,
          } = todo;

          return (
            <li className="TodoList__item" key={id}>
              <TodoCard
                id={id}
                title={title}
                completed={completed}
                userName={userName}
              />
            </li>
          );
        })
      }
    </ul>
  );
};
