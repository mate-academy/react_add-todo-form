import './App.scss';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoForm } from './components/TodoForm';
import { useState } from 'react';
import { Todo } from './types/Todo';
import { getUserById } from './services/getUserById';

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(0, ...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (title: string, userId: number) => {
    const newTodo: Todo = {
      id: getNewTodoId(todos),
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} users={usersFromServer} />
      <TodoList todos={todos} />
    </div>
  );
};
