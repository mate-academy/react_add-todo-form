import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { Todo } from './Types/Todo';
import todosFromServer from './api/todos';
import { getUserById } from './services/user';
import { getNewTodoId } from './services/id';

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (todo: Todo) => {
    const todoWithId = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos(currentTodos => [...currentTodos, todoWithId]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onAdd={addTodo} todos={todos} />
      <TodoList todos={todos} />
    </div>
  );
};
