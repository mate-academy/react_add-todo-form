import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { Todo } from './components/types/todo';
import usersFromServer from './api/users';

const initialTodos: Todo[] = usersFromServer.map(todo => ({
  id: todo.id,
  title: todo.name,
  userId: todo.id,
  completed: false,
}));

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(
    ...todos.map(todo => todo.id),
  );

  return maxId + 1;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = ({ id, ...data }: Todo) => {
    const newTodos = {
      ...data,
      id: getNewTodoId(todos),
    };

    setTodos(currentTodos => [...currentTodos, newTodos]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
