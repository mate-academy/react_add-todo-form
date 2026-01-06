import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};
type EnrichedTodo = Todo & { user: User | null };

function getNewIdTodo(todos: Todo[]) {
  if (todos.length === 0) {
    return 1;
  }
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const addTodo = (newTodo: Omit<Todo, 'id'>) => {
    const todoNew = {
      ...newTodo,
      id: getNewIdTodo(todos),
    };

    setTodos(prev => [...prev, todoNew]);
  };

  const enrichedTodos: EnrichedTodo[] = todos.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId) || null,
  }));


  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm users={usersFromServer} onAddTodo={addTodo} />

      <TodoList todos={enrichedTodos} />
    </div>
  );
};
