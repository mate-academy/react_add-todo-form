import './App.scss';
import { TodoList } from './components/TodoList';
import { getUserById } from './services/getUserById';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoForm } from './components/TodoForm';
import { useState } from 'react';
import { Todo } from './types/Todo';

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos(currentTodos => [newTodo, ...currentTodos]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} users={usersFromServer} />
      <TodoList todos={todos} />
    </div>
  );
};
