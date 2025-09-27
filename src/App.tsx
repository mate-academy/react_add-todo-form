import './App.scss';
import { useState } from 'react';
import users from './api/users';
import todosFromServer, { type Todo, type NewTodo } from './api/todos';
import { TodoList } from './components/TodoList';
import AddTodoForm from './components/AddTodoForm/AddTodoForm';

export const App = () => {
  const enriched = todosFromServer.map(t => {
    const user = users.find(u => u.id === t.userId);

    return user ? { ...t, user } : { ...t, user: users[0] };
  });

  const [todos, setTodos] = useState<Todo[]>(enriched);

  const handleAdd = ({ title, userId }: NewTodo) => {
    setTodos(prev => {
      const maxId = prev.length ? Math.max(...prev.map(t => t.id)) : 0;
      const user = users.find(u => u.id === userId);

      if (!user) {
        return prev;
      }

      const next: Todo = {
        id: maxId + 1,
        user,
        title,
        userId,
        completed: false,
      };

      return [...prev, next];
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm users={users} onAdd={handleAdd} />

      <TodoList todos={todos} />
    </div>
  );
};
