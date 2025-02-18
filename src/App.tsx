import './App.scss';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList/TodoList';
import todosFromServer from './api/todos';
import { Todo } from './components/Types/Todo';
import { getUserById } from './services/userService';
import { useState } from 'react';
import users from './api/users';

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addPost = (newTodo: Todo) => {
    const maxId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;

    const todoWithId = { ...newTodo, id: maxId + 1 };

    setTodos(currentTodos => [...currentTodos, todoWithId]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onSubmit={addPost} users={users} />
      <TodoList todos={todos} />
    </div>
  );
};
