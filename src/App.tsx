import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const handleAddTodo = (title: string, userId: number) => {
    const maxId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;

    const newTodo: Todo = {
      id: maxId + 1,
      title,
      userId,
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodo onAdd={handleAddTodo} users={usersFromServer} />

      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
