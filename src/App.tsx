import { useState } from 'react';
import './App.scss';
import { TodoForm } from './components/TodoForm';
import serverTodos from './api/todos';
import serverUsers from './api/users';
import { ToDo } from './types/ToDo';
import { TodoList } from './components/TodoList';
import { getUser } from './utils/getUser';

function getPreparedTodos(todos: Omit<ToDo, 'user'>[]): ToDo[] {
  return todos.map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }));
}

export const App = () => {
  const [todos, setTodos] = useState(getPreparedTodos(serverTodos));

  const handleAddTodo = (todo: ToDo) => {
    setTodos(curTodos => {
      const id = (Math.max(...curTodos.map(item => item.id)) || 0) + 1;

      return [
        ...curTodos,
        {
          ...todo,
          id,
        },
      ];
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={handleAddTodo} users={serverUsers} />

      <TodoList todos={todos} />
    </div>
  );
};
