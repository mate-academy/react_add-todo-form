import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { Todo } from './types';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const enrichTodo = (todo: Todo) => {
    const user = usersFromServer.find(us => us.id === todo.userId);

    return {
      ...todo,
      user: user || null,
    };
  };

  const todoData = todosFromServer.map(enrichTodo);
  const [todos, setTodos] = useState<Todo[]>(todoData);

  const addTodo = (todo: Todo) => {
    const newId =
      todos.length > 0 ? Math.max(...todos.map(t => t.id || 0)) + 1 : 1;

    const newTodo: Todo = {
      ...todo,
      id: newId,
      completed: false,
      user: usersFromServer.find(user => user.id === todo.userId) || null,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onAdd={addTodo} users={usersFromServer} />
      <TodoList todos={todos} />
    </div>
  );
};
