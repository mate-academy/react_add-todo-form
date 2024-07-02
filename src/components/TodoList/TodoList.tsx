import React from 'react';
<<<<<<< HEAD
import { Todo } from '../../api/todos';
import { TodoInfo } from '../TodoInfo';
import { User } from '../UserInfo';

interface TodoListProps {
  todos: Todo[];
  getUserById: (userId: number) => User | null;
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <div className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
=======
import { Todo } from '../TodoList';

type Props = {
  todo: Todo;
};

const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <div>
      <h2>{todo.title}</h2>
      <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
      <p>User: {todo.user}</p> {/* Ensure todo.user is accessed here */}
>>>>>>> 9a9744cbed8c7de13c378f61c6037a52c7e3c6ea
    </div>
  );
};

<<<<<<< HEAD
export default TodoList;
=======
export default TodoInfo;
>>>>>>> 9a9744cbed8c7de13c378f61c6037a52c7e3c6ea
