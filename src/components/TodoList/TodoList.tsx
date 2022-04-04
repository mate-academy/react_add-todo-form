import './TodoList.scss';
import { FC, memo } from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
}

export const TodoList: FC<Props> = memo(({ todos }) => (
  <ul className="Todolist d-flex flex-column">
    {todos.map(todo => (
      <li className="Todolist__item" key={todo.todoId}>
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
));
