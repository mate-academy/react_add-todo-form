import './App.scss';

import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { TodoForm } from './components/TodoForm/TodoForm';
import { getUserById } from './services/getUserById';

const initialTodos: Todo[] = todosFromServer
  .map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }))
  .filter(todo => todo.user !== null);

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));
  return maxId + 1;
}
export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const addTodos = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };
  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onSubmit={addTodos} users={usersFromServer} />

      <TodoList todos={todos} />
    </div>
  );
};