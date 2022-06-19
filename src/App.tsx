import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import { PreparedTodos, Todo, User } from './appTypeDefs';
import todos from './api/todos';
import users from './api/users';

function prepareTodos(
  todoList: Todo[],
  usersList: User[],
): PreparedTodos[] {
  return todoList.map(todo => ({
    ...todo,
    user: usersList.find(user => user.id === todo.userId),
  }));
}

export const preparedTodos: PreparedTodos[] = prepareTodos(todos, users);

const App: React.FC = () => (
  <>
    <div className="App">
      <h1>To-Do List</h1>
      <TodoList preparedToDos={preparedTodos} />
      <hr />
    </div>
  </>
);

export default App;
