import React from 'react';
import { TodoType } from '../../react-app-env';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import '../../App.scss';

type Props = {
  preparedTodos: TodoType[]
};

export const TodoList: React.FC<Props> = ({ preparedTodos }) => (
  <>
    <ul>
      {preparedTodos.map(item => (
        <li className="box box-color box--hover" key={item.id}>
          {item.user
            && (
              <TodoInfo todo={item} />
            )}
        </li>
      ))}
    </ul>
  </>

);
