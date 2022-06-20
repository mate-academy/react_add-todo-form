import { FC } from 'react';
import { PreparedTodos } from '../../appTypeDefs';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface TodoListProps {
  preparedToDos: PreparedTodos[];
}

export const TodoList: FC<TodoListProps> = ({ preparedToDos }) => {
  return (
    <table className="table table-sm table-dark">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">TO-DO TASK</th>
          <th scope="col">STATUS</th>
          <th scope="col">USER DETAILS</th>
        </tr>
      </thead>
      <tbody>
        {preparedToDos.map(todo => (
          <TodoInfo todo={todo} key={todo.id} />
        ))}
      </tbody>
    </table>
  );
};
