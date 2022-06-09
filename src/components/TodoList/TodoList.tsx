// Don't forget to import the React library
import React from 'react';
import TodoInfo from '../TodoInfo/TodoInfo';
import { PreparedTodo } from '../../react-app-env';
import './TodoList.scss';
// Create a `TodoList` component accepting an array of `preparedTodos` and
// rendering them as a list
// Add a default export statement for TodoInfo component to use it in the other files
type Props = {
  todos: PreparedTodo[];
};

const TodoList: React.FC<Props> = ({ todos }) => (
  <div className="todo__list-info">
    {
      todos.map(todo => (
        <div key={todo.id} className="todo__item card card-content">
          <TodoInfo todo={todo} />
        </div>
      ))
    }
  </div>
);

export default TodoList;
