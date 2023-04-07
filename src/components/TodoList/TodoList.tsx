import './TodoList.scss';

import { TodoInfo } from '../TodoInfo';

import { ToDo } from '../../types/ToDo';

type Props = {
  todos: ToDo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="TodoList">
    {
      todos.map(todo => (
        <TodoInfo
          todo={todo}
          key={todo.id}
        />
      ))
    }
  </ul>
);
