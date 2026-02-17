import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { NewTodoForm } from './components/NewTodo/NewTodo';
import { Todo } from './types';

export const App = () => {
  const initialTodos: Todo[] = todosFromServer.map(serverTodo => {
    const user = usersFromServer.find(
      serverUser => serverUser.id === serverTodo.userId,
    );

    if (!user) {
      throw new Error('User not found');
    }

    return { ...serverTodo, user };
  });

  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const handleAddTodo = (title: string, userId: number) => {
    const user = usersFromServer.find(serverUser => serverUser.id === userId);

    if (!user) {
      return;
    }

    const newId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

    const newTodo: Todo = {
      id: newId,
      title,
      userId,
      completed: false,
      user,
    };

    setTodos([...todos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodoForm onAdd={handleAddTodo} users={usersFromServer} />

      <TodoList todos={todos} />
    </div>
  );
};
