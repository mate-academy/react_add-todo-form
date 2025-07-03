import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoForm } from './components/TodoForm/TodoForm';
import { useState } from 'react';

function getUserById(userId: number): User | undefined {
  return usersFromServer.find(user => user.id === userId);
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: getUserById(todo.userId)!,
    })),
  );

  const nextId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
  const handleAddTodo = ({
    title,
    userId,
  }: {
    title?: string;
    userId: number;
  }) => {
    const user = getUserById(userId);

    if (!user) {
      return;
    }

    const todo: Todo = {
      id: nextId,
      title: title?.trim() || `Todo #${nextId}`,
      completed: false,
      user,
    };

    setTodos(prev => [...prev, todo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={handleAddTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
