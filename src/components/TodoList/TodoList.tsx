import { FC } from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { TodoUser } from '../../react-app-env';

type Props = {
  todosList: TodoUser[];
};

export const TodoList:FC<Props> = ({ todosList }) => (
  <>
    <section className="TodoList">
      {todosList.map(todoItem => (
        <TodoInfo todo={todoItem} key={todoItem.id} />
      ))}
    </section>
  </>
);
