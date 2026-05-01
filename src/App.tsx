import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { Todo } from './types/Todo';
import initialTodos from './api/todos';
import initialUsers from './api/users';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (newTodo: Todo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const maxId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;

  return (
    <div className="todo-app">
      <h1 className="title">Todo List</h1>

      <div className="content">
        <TodoForm users={initialUsers} onAdd={addTodo} nextId={maxId + 1} />

        <TodoList todos={todos} />
      </div>
    </div>
  );
};
