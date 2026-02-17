import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { NewTodoForm } from './components/NewTodo/NewTodo';

export interface NewTodo {
  title: string;
  userId: number;
}

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: (typeof usersFromServer)[number];
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => {
      const user = usersFromServer.find(u => u.id === todo.userId)!;

      return { ...todo, user };
    }),
  );

  const handleAddTodo = (newTodo: NewTodo) => {
    const user = usersFromServer.find(u => u.id === newTodo.userId)!;

    const newItem: Todo = {
      id: Math.max(...todos.map(t => t.id)) + 1,
      title: newTodo.title,
      userId: newTodo.userId,
      completed: false,
      user,
    };

    setTodos([...todos, newItem]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodoForm onAdd={handleAddTodo} />

      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
