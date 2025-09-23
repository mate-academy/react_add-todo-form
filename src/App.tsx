import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { TodoForm } from './components/TodoForm';
import { useState } from 'react';
import { User } from './types/User';

export function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const App: React.FC = () => {
  const initialTodos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const getNewTodoId = (todos: Todo[]) => {
    if (!todos.length) {
      return 1;
    }

    const maxId = Math.max(...todos.map(todo => todo.id));

    return maxId + 1;
  };

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const addTodo = (data: { title: string; userId: number }) => {
    const newTodo = {
      id: getNewTodoId(todos),
      completed: false,
      user: getUserById(data.userId),
      ...data,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm users={usersFromServer} onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
