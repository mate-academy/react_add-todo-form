import './App.scss';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { Todo } from './types/todo';
import { TodoForm } from './components/TodoForm/TodoForm';
import { getUserById } from './services/user';
import { useState } from 'react';

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addPost = (newTodoData: Omit<Todo, 'id'>) => {
    setTodos(prev => {
      const maxId =
        prev.length > 0 ? Math.max(...prev.map(todo => todo.id)) : 0;

      const fullTodo: Todo = {
        ...newTodoData,
        id: maxId + 1,
      };

      return [...prev, fullTodo];
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addPost} users={usersFromServer} />
      <TodoList todos={todos} />
    </div>
  );
};
