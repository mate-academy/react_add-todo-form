import { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { getUserById } from './servises/GetUser';
import { Todo } from './types/Todo';
import users from './api/users';

export const App = () => {
  const todos = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const [initialTodos, setInitialTodos] = useState<Todo[]>(todos);

  const addTodo = (formData: { title: string; userId: number }) => {
    const newId = Math.max(...initialTodos.map(todo => todo.id)) + 1;
    const user = getUserById(formData.userId);

    const newTodo: Todo = {
      id: newId,
      title: formData.title,
      userId: formData.userId,
      completed: false,
      user: user,
    };

    setInitialTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="section">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} users={users} />
      <TodoList todos={initialTodos} />
    </div>
  );
};
