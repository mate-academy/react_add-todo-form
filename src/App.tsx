import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoAgregate, TodoWithoutId } from './domains/TodoAgregate';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { AddTodoForm } from './components/AddTodoForm';
import { User } from './domains/User';
import { useState } from 'react';

const todosList: TodoAgregate[] = todosFromServer.map(todo => {
  const user = usersFromServer.find(u => u.id === todo.userId) as User;

  return {
    ...todo,
    user,
  };
});

export const App = () => {
  const [todos, setTodos] = useState(todosList);

  const handleAddTodo = (todoWithoutId: TodoWithoutId) => {
    const id = Math.max(...todos.map(t => t.id)) + 1;

    setTodos(prev => [...prev, { id, ...todoWithoutId }]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm onAdd={handleAddTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
