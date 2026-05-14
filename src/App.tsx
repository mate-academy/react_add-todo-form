import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User, Todo, TodoWithUser } from './types';
import { TodoList } from './components/TodoList';
import { CreateTodoForm } from './components/CreateTodoForm';

function prepareTodos(todos: Todo[], users: User[]): TodoWithUser[] {
  return todos.map(todo => ({
    ...todo,
    user: users.find(item => todo.userId === item.id) ?? null,
  }));
}

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(() =>
    prepareTodos(todosFromServer, usersFromServer),
  );

  function handleAddTodo(title: string, userId: number) {
    const user = usersFromServer.find(item => item.id === userId) || null;

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title,
      userId,
      completed: false,
      user: user || null,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <CreateTodoForm users={usersFromServer} onAddTodo={handleAddTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
